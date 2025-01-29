import { collection, getDocs, FirestoreError } from "firebase/firestore/lite";
import { useState } from "react";
import { db } from "../firebase/firebase";

interface UseGetColection {
  data: { id: string; [key: string]: string | number | boolean }[];
  error: FirestoreError | null;
  loading: boolean;
  getData: () => Promise<void>;
}

export const useGetColection = (dbCollection: string): UseGetColection => {
  const [data, setData] = useState<
    { id: string; [key: string]: string | number | boolean }[]
  >([]);
  const [error, setError] = useState<FirestoreError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async () => {
    setLoading((prev) => !prev);
    try {
      const querySnapshot = await getDocs(collection(db, dbCollection));
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setData(newData);
    } catch (err) {
      console.error("Error fetching data: ", err);
      setError(err as FirestoreError);
    } finally {
      setLoading((prev) => !prev);
    }
  };

  return { data, error, loading, getData };
};
