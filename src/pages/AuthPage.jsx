import { signInWithRedirect } from "firebase/auth"
import { auth, provider } from "../firebase/firebaseConfig";


const AuthPage = () => {
const handleClick = () => {
signInWithRedirect(auth, provider);
}

  return (
    <div className="auth">
        <h1>Chat Room</h1>
        <p>Sign in to continue</p>
        <button onClick={handleClick}>
            <img src="/public/g-logo.png" />
            <span>Log in with Google</span>
        </button>
    </div>
  )
}

export default AuthPage