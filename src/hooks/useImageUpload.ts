import { useState } from 'react';
import { uploadImage, getImages, deleteImage, ImageDocument } from '../firebase/imageService';

export const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (file: File, folder?: string): Promise<ImageDocument | null> => {
    setUploading(true);
    setError(null);
    try {
      const result = await uploadImage(file, folder);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const fetchImages = async (): Promise<ImageDocument[]> => {
    try {
      return await getImages();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch images');
      return [];
    }
  };

  const removeImage = async (imageDoc: ImageDocument): Promise<boolean> => {
    try {
      await deleteImage(imageDoc);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete image');
      return false;
    }
  };

  return { upload, fetchImages, removeImage, uploading, error };
};
