import React, { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import axios from "axios";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  const registerUser = (email, password) => {
    setLoader(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoader(true);
    return signInWithPopup(auth, googleProvider);
  };

  const signOutUser = () => {
    setLoader(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        const user = { email: currentUser.email };
        axios
          .post("https://pastportals-server.vercel.app/jwt", user, {
            withCredentials: true,
          })
          .then((res) => {
            setLoader(false);
          });
      } else {
        axios
          .post(
            "https://pastportals-server.vercel.app/logout",
            {},
            { withCredentials: true }
          )
          .then((res) => {
            setLoader(false);
          });
      }
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const updateUsersProfileInfo = (profileInfo) => {
    return updateProfile(auth.currentUser, profileInfo);
  };

  const authInfo = {
    user,
    setUser,
    registerUser,
    signInUser,
    signInWithGoogle,
    signOutUser,
    loader,
    setLoader,
    updateUsersProfileInfo,
  };
  return (
    <div>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
