import { auth } from "../firebase/firebaseConfig"


const Message = ({ msg }) => {
// mesaji gonderen kisi oturumu acik olan kisiyle eslesirse ekrana bas
if(msg.user.uid === auth.currentUser.uid) {
    return <p className="msg-text">{msg.text}</p>;
}

// msji baskasi gonderdiyse:
  return (
    <div className="msg-other">
        <p className="user-info">
            <img src={msg.user.photo} />
            <span>{msg.user.name}:</span>
        </p>
        <p className="msg-text">{msg.text}</p>
    </div>
  )
}

export default Message
