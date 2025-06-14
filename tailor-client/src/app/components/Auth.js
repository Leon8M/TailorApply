import { auth, googleProvider } from "../lib/firebase";
import { signInWithPopup } from "firebase/auth";

export default function Auth() {
  const signIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>TailorApply</h1>
      <button onClick={signIn}>Sign in with Google</button>
    </div>
  );
}