import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";
import { useEffect, useState } from "react";
import Message from "../components/Message";

const Chat = ({ room, setRoom }) => {
  const [messages, setMessages] = useState([]);

  // koleksiyonun referansini alma
  const messagesCol = collection(db, "messages");

  // formun gonderilmesi
  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = e.target[0].value;

    // add new document to the collection
    await addDoc(messagesCol, {
      text,
      room,
      user: {
        name: auth.currentUser.displayName,
        photo: auth.currentUser.photoURL,
        uid: auth.currentUser.uid,
      },
      createdAt: serverTimestamp(),
    });
    // clear the input
    e.target[0].value = "";
  };
  useEffect(() => {
    // filtreleme ayarlari tanimlama
    const queryOptions = query(
      messagesCol,
      where("room", "==", room),
      orderBy("createdAt", "asc")
    );
    // koleksiyondaki degisimi izleyip
    // koleksiyon her degistiginde fonksiyon calistirir
    // ve fonksiyona koleksiyonun guncel verilerini aktarir
    const unsubscribe = onSnapshot(queryOptions, (snapshot) => {
      const comingMessages = [];

      // dokumanlari donup doc icerisindeki verilere
      // erisip bir diziye aktarma
      snapshot.docs.forEach((doc) =>
        comingMessages.push({ ...doc.data(), id: doc.id })
      );

      setMessages(comingMessages);
    });

    return () => {
      // koleksiyonu izlemeyi durdurur
      unsubscribe();
    };
  }, []);

  return (
    <div className="chat">
      <header>
        <p className="user">{auth.currentUser?.displayName}</p>
        <p>{room}</p>
        <a onClick={() => setRoom(null)}>Exit</a>
      </header>

      <main>
        {messages.map((msg) => (
          <Message key={msg.id} msg={msg} />
        ))}
      </main>

      <form onSubmit={handleSubmit}>
        <input required placeholder="write your message" type="text" />
        <button>Send</button>
      </form>
    </div>
  );
};

export default Chat;
