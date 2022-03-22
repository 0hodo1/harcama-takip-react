import { useState, useEffect } from "react";
import { auth } from "../firebase/config";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const { dispatch } = useAuthContext();

  const [error, setError] = useState(null);
  const [waiting, setWaiting] = useState(false);

  const [cancel, setCancel] = useState(false);

  useEffect(() => {
    return () => {
      setCancel(true);
    };
  }, []);

  const signup = async (email, password, displayName) => {
    setError(null);
    setWaiting(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res.user);

      if (!res.user) {
        throw new Error("User not created");
      }

      await updateProfile(res.user, { displayName });
      console.log(res.user);
      dispatch({ type: "LOGIN", payload: res.user });

      if (!cancel) {
        setWaiting(false);
        setError(null);
      }
    } catch (error) {
      if (!cancel) {
        setError(error.message);
        setWaiting(false);
      }
    }
  };

  return {
    error,
    waiting,
    signup,
  };
};
