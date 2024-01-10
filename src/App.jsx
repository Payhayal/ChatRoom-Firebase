import { useEffect, useState } from "react";
import AuthPage from "./pages/AuthPage";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import Chat from "./pages/Chat";

function App() {
  const [isAuth, setIsAuth] = useState();
  const [room, setRoom] = useState(null);

  useEffect(() => {
    // onAuthStateChanged =>auth objesinin degisimini izler
    // fonksiyonu =>kullanicinin giris ve cikis isleminde tetiklenir
    // calistirdigi fonksiyona aktif kullanici varsa gonderir
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
  }, []);

  const handleLogout = () => {
    // kullanınıcının oturumunu kapatar
    signOut(auth).catch((err) => console.log("HATA", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setRoom(e.target[0].value);
  };
  // kullanicinin oturumu kapaliysa login sayfasini ekrana bas
  if (isAuth === false) {
    return (
      <div className="container">
        <AuthPage />
      </div>
    );
  }

  return (
    <div className="container">
      {room ? (
        // odayi belirlediyse
        <Chat room={room} setRoom={setRoom} />
      ) : (
        // odayi henuz belirlemediyse
        <form onSubmit={handleSubmit} className="room-page">
          <h1>Chat Room</h1>
          <p>Which room will you enter?</p>
          <input required placeholder=" ex: weekend " type="text" />

          <button className="submit">Enter Room</button>
          <button onClick={handleLogout} className="button">
            Log Out
          </button>
        </form>
      )}
    </div>
  );
}

export default App;
