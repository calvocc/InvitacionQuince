import {
  collection,
  getDocs,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
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

interface UseGetColectionId {
  data?: { [key: string]: string | number | boolean };
  error: FirestoreError | null;
  loading: boolean;
  getDataId: (id: string) => Promise<void>;
}

interface UsePostColection {
  loading: boolean;
  error: FirestoreError | null;
  showSnackbar: {
    open: boolean;
    message?: string;
    severity?: "success" | "error";
  };
  postData: (data: {
    [key: string]: string | number | boolean;
  }) => Promise<void>;
}

interface UsePutColection {
  loading: boolean;
  error: FirestoreError | null;
  showSnackbar: {
    open: boolean;
    message?: string;
    severity?: "success" | "error";
  };
  putData: (data: {
    [key: string]: string | number | boolean;
  }) => Promise<void>;
}

interface UseDeleteColection {
  loading: boolean;
  error: FirestoreError | null;
  showSnackbar: {
    open: boolean;
    message?: string;
    severity?: "success" | "error";
  };
  deleteData: (uid: string) => Promise<void>;
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

export const useGetColectionId = (dbCollection: string): UseGetColectionId => {
  const [data, setData] = useState<{
    [key: string]: string | number | boolean;
  }>();
  const [error, setError] = useState<FirestoreError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getDataId = async (id: string) => {
    setLoading(true);
    try {
      const docSnap = await getDoc(doc(db, dbCollection, id));
      if (docSnap.exists()) {
        const data = docSnap.data();
        setData({ id: docSnap.id, ...data });
      }
    } catch (err) {
      setError(err as FirestoreError);
    } finally {
      setLoading(false);
    }
  };
  return { data, error, loading, getDataId };
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

export const usePutColection = (dbCollection: string): UsePutColection => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<FirestoreError | null>(null);
  const [showSnackbar, setShowSnackbar] = useState<{
    open: boolean;
    message?: string;
    severity?: "success" | "error";
  }>({
    open: false,
  });

  const putData = async (data: {
    [key: string]: string | number | boolean;
  }) => {
    setLoading((prev) => !prev);
    try {
      await updateDoc(doc(db, dbCollection, data.uid as string), data);
      setShowSnackbar({
        open: true,
        message: "Se ha editado el registro correctamente",
        severity: "success",
      });
    } catch (err) {
      setError(err as FirestoreError);
      setShowSnackbar({
        open: true,
        message: "Ha ocurrido un error al editar el registro",
        severity: "error",
      });
    } finally {
      setLoading((prev) => !prev);
    }
  };

  return { loading, error, showSnackbar, putData };
};

export const useDeleteColection = (
  dbCollection: string
): UseDeleteColection => {
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

  const deleteData = async (uid: string) => {
    setLoading((prev) => !prev);
    try {
      await deleteDoc(doc(db, dbCollection, uid as string));
      setShowSnackbar({
        open: true,
        message: "Se ha eliminado el registro correctamente",
        severity: "success",
      });
    } catch (err) {
      setError(err as FirestoreError);
      setShowSnackbar({
        open: true,
        message: "Ha ocurrido un error al eliminar el registro",
        severity: "error",
      });
    } finally {
      setLoading((prev) => !prev);
    }
  };

  return { loading, error, showSnackbar, deleteData };
};
