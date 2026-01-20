import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './config';

export interface WriteUp {
  id: number;
  districtId: number;
  title: string;
  type: string;
  tenure: string;
  yearOfReview: string;
  content: string;
  images: string[]; // URLs from Firebase Storage
}

const WRITEUPS_COLLECTION = 'writeups';

export const getWriteUpsByDistrict = async (districtId: number): Promise<WriteUp[]> => {
  const q = query(
    collection(db, WRITEUPS_COLLECTION),
    where('districtId', '==', districtId)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.data().id,
    ...doc.data(),
  })) as WriteUp[];
};

export const getAllWriteUps = async (): Promise<WriteUp[]> => {
  const querySnapshot = await getDocs(collection(db, WRITEUPS_COLLECTION));
  return querySnapshot.docs.map(doc => ({
    id: doc.data().id,
    ...doc.data(),
  })) as WriteUp[];
};
