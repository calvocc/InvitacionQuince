import {
  collection,
  getDocs,
  setDoc,
  doc,
  FirestoreError,
} from "firebase/firestore/lite";
import { useState } from "react";
import { db } from "../firebase/firebase";

interface UseGetColection {
  data: { id: string; [key: string]: string | number | boolean }[];
  error: FirestoreError | null;
  loading: boolean;
  getData: () => Promise<void>;
}

interface UsePostColection {
  loading: boolean;
  error: FirestoreError | null;
  showSnackbar: {
    open: boolean;
    message: string;
    severity: "success" | "error";
  };
  postData: (data: {
    [key: string]: string | number | boolean;
  }) => Promise<void>;
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
      setError(err as FirestoreError);
    } finally {
      setLoading((prev) => !prev);
    }
  };

  return { data, error, loading, getData };
};

export const usePostColection = (dbCollection: string): UsePostColection => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<FirestoreError | null>(null);
  const [showSnackbar, setShowSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const postData = async (data: {
    [key: string]: string | number | boolean;
  }) => {
    setLoading((prev) => !prev);
    try {
      await setDoc(doc(db, dbCollection, data.uid as string), data);
      setShowSnackbar({
        open: true,
        message: "Se ha creado el registro correctamente",
        severity: "success",
      });
    } catch (err) {
      setError(err as FirestoreError);
      setShowSnackbar({
        open: true,
        message: "Ha ocurrido un error al crear el registro",
        severity: "error",
      });
    } finally {
      setLoading((prev) => !prev);
    }
  };

  return { loading, error, showSnackbar, postData };
};
