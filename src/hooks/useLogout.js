import { useState } from "react";
import { auth } from "../firebase/config";

import { signOut } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const [error, setError] = useState(null);
  const [waiting, setWaiting] = useState(false);

  const logout = async () => {
    setWaiting(true);
    setError(null);
    try {
      await signOut(auth);
      dispatch({ type: "LOGOUT" });

      setWaiting(false);
      setError(null);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
      setWaiting(false);
    }
  };

  return {
    error,
    waiting,
    logout,
  };
};
