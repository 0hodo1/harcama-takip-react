import { useEffect, useState, useReducer } from "react";
import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  deleteDoc,
} from "@firebase/firestore";

const startData = {
  doc: null,
  loading: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "WAITING":
      return {
        error: null,
        doc: null,
        success: false,
        loading: true,
      };
    case "DOC_ADDED":
      return {
        error: null,
        doc: action.payload,
        success: true,
        loading: false,
      };
    case "ERROR":
      return {
        error: action.payload,
        doc: null,
        success: false,
        loading: false,
      };
    case "DOC_DELETED":
      return {
        error: null,
        doc: null,
        success: true,
        loading: false,
      };
    default:
      return state;
  }
};

export const useFirestore = (col) => {
  const [response, dispatch] = useReducer(firestoreReducer, startData);
  const [cancel, setCancel] = useState(false);

  const ref = collection(db, col);

  const addingDoc = async (doc) => {
    dispatch({ type: "WAITING" });
    try {
      const createdAt = serverTimestamp();
      const addedDoc = await addDoc(ref, { ...doc, createdAt });
      if (!cancel) {
        dispatch({ type: "DOC_ADDED", payload: addedDoc });
      }
    } catch (error) {
      if (!cancel) {
        dispatch({ type: "ERROR", payload: error.message });
      }
    }
  };

  const deletedDoc = async (id) => {
    dispatch({ type: "WAITING" });
    try {
      let ref = doc(db, col, id);
      await deleteDoc(ref);
      if (!cancel) {
        dispatch({ type: "DOC_DELETED" });
      }
    } catch (error) {
      if (!cancel) {
        dispatch({ type: "ERROR", payload: error.message });
      }
    }
  };

  useEffect(() => {
    return () => setCancel(true);
  }, []);

  return {
    addingDoc,
    deletedDoc,
    response,
  };
};
