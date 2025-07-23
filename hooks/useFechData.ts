import { firestore } from "@/config/firebase";
import {
  collection,
  onSnapshot,
  query,
  QueryConstraint,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

const useFechData = <T>(
  collectionName: string,
  constraints: QueryConstraint[] = [],
) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!collectionName) return;

    const collectionRef = collection(firestore, collectionName);

    const q = query(collectionRef, ...constraints);

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const fetchData = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as T[];

        setData(fetchData);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching data: ", error);
        // TODO: adicionar um toast de erro
        setError(error.message);
        setLoading(false);
      },
    );

    return () => unsub();
  }, []);

  return { data, loading, error };
};

export default useFechData;

const styles = StyleSheet.create({});
