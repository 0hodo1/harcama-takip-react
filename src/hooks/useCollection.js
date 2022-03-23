import { useEffect, useState, useRef } from "react";
import { db } from "../firebase/config";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";

export const useCollection = (col, _query, _orderBy) => {
  const [docs, setDocs] = useState(null);
  const [error, setError] = useState(null);

  const q = useRef(_query).current;

  const oBy = useRef(_orderBy).current;

  useEffect(() => {
    let ref = collection(db, col);

    if (q) {
      ref = query(ref, where(...q));
    }

    if (oBy) {
      ref = query(ref, orderBy(...oBy));
    }

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });
        setDocs(results);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError("veriler getirilemedi");
      }
    );
    return () => unsubscribe();
  }, [col]);

  return { docs, error };
};
