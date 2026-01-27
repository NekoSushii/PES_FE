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
  status: string;
  createdAt: Date;
}

// District name mapping
const DISTRICT_NAMES: Record<number, string> = {
  1: 'Bedok',
  24: 'Tanglin',
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
  
  return querySnapshot.docs.map(docSnap => {
    const data = docSnap.data();
    return {
      docId: docSnap.id,
      id: data.id,
      districtId: data.districtId,
      title: data.title,
      type: data.type,
      tenure: data.tenure,
      yearOfReview: data.yearOfReview,
      reviewBy: data.reviewBy,
      content: data.contents || data.content || '',
      status: data.status,
      createdAt: data.createdAt?.toDate() || new Date(),
    };
  }) as PendingContribution[];
};

export const approveContribution = async (contribution: PendingContribution): Promise<boolean> => {
  try {
    // Extract image URLs from content
    const imgRegex = /<img[^>]+src="([^"]+)"/g;
    const contentStr = contribution.content;
    let match;
    const imageUrls: string[] = [];
    
    while ((match = imgRegex.exec(contentStr)) !== null) {
      if (match[1].includes('contributions%2F') || match[1].includes('contributions/')) {
        imageUrls.push(match[1]);
      }
    }

    // Move images from contributions to district folder
    let updatedContent = contentStr;
    const districtFolder = DISTRICT_NAMES[contribution.districtId] || 'Other';
    
    for (const url of imageUrls) {
      try {
        // Extract the file path from URL - handle URL encoded paths
        const urlObj = new URL(url);
        const pathMatch = urlObj.pathname.match(/\/o\/(.+?)(\?|$)/);
        if (pathMatch) {
          const oldPath = decodeURIComponent(pathMatch[1]);
          const fileName = oldPath.split('/').pop();
          
          if (!fileName) {
            console.error('Could not extract filename from path:', oldPath);
            continue;
          }
          
          const newPath = `${districtFolder}/${fileName}`;
          
          console.log('Moving image from:', oldPath, 'to:', newPath);
          
          // Download the file using fetch
          const response = await fetch(url);
          if (!response.ok) {
            console.error('Failed to fetch image:', response.status, response.statusText);
            continue;
          }
          const blob = await response.blob();
          
          // Upload to new location
          const newRef = ref(storage, newPath);
          await uploadBytes(newRef, blob);
          const newUrl = await getDownloadURL(newRef);
          
          // Delete old file
          const oldRef = ref(storage, oldPath);
          await deleteObject(oldRef);
          
          // Update content with new URL (replace the entire old URL including query params)
          updatedContent = updatedContent.split(url).join(newUrl);
        }
      } catch (imgError) {
        console.error('Failed to move image:', url, imgError);
      }
    }

    // Update the document
    await updateDoc(doc(db, 'writeups', contribution.docId), {
      isActive: true,
      content: updatedContent,
    });

    return true;
  } catch (error) {
    console.error('Error approving contribution:', error);
    return false;
  }
};

export const rejectContribution = async (contribution: PendingContribution): Promise<boolean> => {
  try {
    // Extract all image URLs from content and delete them
    const imgRegex = /<img[^>]+src="([^"]+)"/g;
    const content = contribution.content;
    let match;
    
    while ((match = imgRegex.exec(content)) !== null) {
      const imageUrl = match[1];
      // Check if it's a Firebase Storage URL
      if (imageUrl.includes('firebasestorage.googleapis.com')) {
        try {
          const urlObj = new URL(imageUrl);
          const pathMatch = urlObj.pathname.match(/\/o\/(.+?)(\?|$)/);
          if (pathMatch) {
            const filePath = decodeURIComponent(pathMatch[1]);
            const fileRef = ref(storage, filePath);
            await deleteObject(fileRef);
            console.log('Deleted image:', filePath);
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
