import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, addDoc, getDocs, doc, deleteDoc} from 'firebase/firestore';
import { storage, db } from './config';

export interface ImageDocument {
  id?: string;
  url: string;
  path: string;
  name: string;
  createdAt: Date;
}

const IMAGES_COLLECTION = 'images';

export const uploadImage = async (file: File, folder: string = 'images'): Promise<ImageDocument> => {
  const timestamp = Date.now();
  const fileName = `${timestamp}_${file.name}`;
  const storagePath = `${folder}/${fileName}`;
  const storageRef = ref(storage, storagePath);

  // Upload to Firebase Storage
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);

  // Save reference to Firestore
  const imageDoc: Omit<ImageDocument, 'id'> = {
    url,
    path: storagePath,
    name: file.name,
    createdAt: new Date(),
  };

  const docRef = await addDoc(collection(db, IMAGES_COLLECTION), imageDoc);
  
  return { ...imageDoc, id: docRef.id };
};

export const getImages = async (): Promise<ImageDocument[]> => {
  const querySnapshot = await getDocs(collection(db, IMAGES_COLLECTION));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as ImageDocument[];
};

export const deleteImage = async (imageDoc: ImageDocument): Promise<void> => {
  // Delete from Storage
  const storageRef = ref(storage, imageDoc.path);
  await deleteObject(storageRef);

  // Delete from Firestore
  if (imageDoc.id) {
    await deleteDoc(doc(db, IMAGES_COLLECTION, imageDoc.id));
  }
};
