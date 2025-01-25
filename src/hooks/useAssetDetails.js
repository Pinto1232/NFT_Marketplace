import { useQuery } from '@tanstack/react-query';
import { fetchCollectionDetails } from '../services/openseaService';

export const useCollectionDetails = (collectionId) => {
  return useQuery({
    queryKey: ['collectionDetails', collectionId],
    queryFn: () => fetchCollectionDetails(collectionId),
    staleTime: 60000,
  });
};