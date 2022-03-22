import { useState, useEffect } from "react";
import { auth } from "../firebase/config";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const { dispatch } = useAuthContext();

  const [error, setError] = useState(null);
  const [waiting, setWaiting] = useState(false);

  const [cancel, setCancel] = useState(false);

  useEffect(() => {
    return () => {
      setCancel(true);
    };
  }, []);

  const login = async (email, password) => {
    setError(null);
    setWaiting(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res.user);

      if (!res.user) {
        throw new Error("User not created");
      }

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
    login,
  };
};
