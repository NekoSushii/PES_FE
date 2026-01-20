import { useEffect, useState } from 'react';
import { getWriteUpsByDistrict, WriteUp } from '../firebase/writeupService';

export const useWriteUps = (districtId: number | null) => {
  const [writeUps, setWriteUps] = useState<WriteUp[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (districtId === null) {
      setWriteUps([]);
      return;
    }

    const fetchWriteUps = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getWriteUpsByDistrict(districtId);
        setWriteUps(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch writeups');
      } finally {
        setLoading(false);
      }
    };

    fetchWriteUps();
  }, [districtId]);

  // Get all writeups for a polygon (supports multiple reviews)
  const getWriteUpsById = (polygonId: number): WriteUp[] => {
    return writeUps.filter(w => w.id === polygonId);
  };

  // Legacy: get first writeup
  const getWriteUpById = (polygonId: number): WriteUp | undefined => {
    return writeUps.find(w => w.id === polygonId);
  };

  return { writeUps, loading, error, getWriteUpById, getWriteUpsById };
};
