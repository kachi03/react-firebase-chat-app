//Auth component that handles user authentication

import { auth, provider } from "../firebase-config.js";
import { signInWithPopup } from "firebase/auth";
import "../styles/Auth.css";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const Auth = ({ setIsAuth }) => {
  const signInWithGoogle = async () => { //wait for the user to sign in
    try { //tryCatch for sign-in error handling
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken); //save the auth token in cookies
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="auth">
      <p> Sign In With Google To Continue </p>
      <button onClick={signInWithGoogle}> Sign In With Google </button> 
    </div>
  );
};
