import { collection, getDocs, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { ref, deleteObject, getDownloadURL, uploadBytes } from 'firebase/storage';
import { db, storage } from './config';

export interface PendingContribution {
  docId: string;
  id: number;
  districtId: number;
  title: string;
  type: string;
  tenure: string;
  yearOfReview: string;
  reviewBy: string;
  content: string;
  isActive: boolean;
  createdAt: Date;
}

// District name mapping
const DISTRICT_NAMES: Record<number, string> = {
  1: 'Bedok',
  34: 'Hougang',
  42: 'Museum',
  47: 'Rochor',
};

export const getPendingContributions = async (): Promise<PendingContribution[]> => {
  const q = query(
    collection(db, 'writeups'),
    where('isActive', '==', false)
  );
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    docId: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate() || new Date(),
  })) as PendingContribution[];
};

export const approveContribution = async (contribution: PendingContribution): Promise<boolean> => {
  try {
    // Extract image URLs from content
    const imgRegex = /<img[^>]+src="([^"]+)"/g;
    const content = contribution.content;
    let match;
    const imageUrls: string[] = [];
    
    while ((match = imgRegex.exec(content)) !== null) {
      if (match[1].includes('contributions/')) {
        imageUrls.push(match[1]);
      }
    }

    // Move images from contributions to district folder
    let updatedContent = content;
    const districtFolder = DISTRICT_NAMES[contribution.districtId] || 'Other';
    
    for (const url of imageUrls) {
      try {
        // Extract the file path from URL
        const urlObj = new URL(url);
        const pathMatch = urlObj.pathname.match(/\/o\/(.+?)(\?|$)/);
        if (pathMatch) {
          const oldPath = decodeURIComponent(pathMatch[1]);
          const fileName = oldPath.split('/').pop();
          const newPath = `${districtFolder}/${fileName}`;
          
          // Download the file
          const oldRef = ref(storage, oldPath);
          const response = await fetch(url);
          const blob = await response.blob();
          
          // Upload to new location
          const newRef = ref(storage, newPath);
          await uploadBytes(newRef, blob);
          const newUrl = await getDownloadURL(newRef);
          
          // Delete old file
          await deleteObject(oldRef);
          
          // Update content with new URL
          updatedContent = updatedContent.replace(url, newUrl);
        }
      } catch (imgError) {
        console.error('Failed to move image:', imgError);
      }
    }

    // Update the document
    await updateDoc(doc(db, 'writeups', contribution.docId), {
      isActive: true,
      content: updatedContent,
    });

    return true;
  } catch (error) {
    console.error('Failed to approve contribution:', error);
    return false;
  }
};

export const rejectContribution = async (contribution: PendingContribution): Promise<boolean> => {
  try {
    // Extract image URLs from content and delete them
    const imgRegex = /<img[^>]+src="([^"]+)"/g;
    const content = contribution.content;
    let match;
    
    while ((match = imgRegex.exec(content)) !== null) {
      if (match[1].includes('contributions/')) {
        try {
          const urlObj = new URL(match[1]);
          const pathMatch = urlObj.pathname.match(/\/o\/(.+?)(\?|$)/);
          if (pathMatch) {
            const filePath = decodeURIComponent(pathMatch[1]);
            const fileRef = ref(storage, filePath);
            await deleteObject(fileRef);
          }
        } catch (imgError) {
          console.error('Failed to delete image:', imgError);
        }
      }
    }

    // Delete the document
    await deleteDoc(doc(db, 'writeups', contribution.docId));

    return true;
  } catch (error) {
    console.error('Failed to reject contribution:', error);
    return false;
  }
};
