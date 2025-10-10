import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { firestoreDb } from "../config/FirebaseConfig";
import { Timer, TimerInput } from "../types/Timer";

const COLLECTION_NAME = "timers";

export const timerService = {
  // CREATE
  async createTimer(timerData: TimerInput): Promise<string> {
    try {
      const docRef = await addDoc(collection(firestoreDb, COLLECTION_NAME), {
        ...timerData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      return docRef.id;
    } catch (error) {
      console.error("Error creating timer:", error);
      throw error;
    }
  },

  // READ ALL
  async getAllTimers(): Promise<Timer[]> {
    try {
      const q = query(
        collection(firestoreDb, COLLECTION_NAME),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      })) as Timer[];
    } catch (error) {
      console.error("Error getting timers:", error);
      throw error;
    }
  },

  // READ ONE
  async getTimer(id: string): Promise<Timer | null> {
    try {
      const docRef = doc(firestoreDb, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data(),
          createdAt: docSnap.data().createdAt?.toDate(),
          updatedAt: docSnap.data().updatedAt?.toDate(),
        } as Timer;
      }
      return null;
    } catch (error) {
      console.error("Error getting timer:", error);
      throw error;
    }
  },

  // UPDATE
  async updateTimer(id: string, timerData: Partial<TimerInput>): Promise<void> {
    try {
      const docRef = doc(firestoreDb, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        ...timerData,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error("Error updating timer:", error);
      throw error;
    }
  },

  // DELETE
  async deleteTimer(id: string): Promise<void> {
    try {
      const docRef = doc(firestoreDb, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting timer:", error);
      throw error;
    }
  },
};
