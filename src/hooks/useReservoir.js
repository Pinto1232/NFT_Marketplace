import { useQuery } from '@tanstack/react-query';
import { fetchCollections } from '../services/reservoirService';

export const useOpenseaAssets = (params) => {
  return useQuery({
    queryKey: ['collections', params],
    queryFn: () => fetchCollections(params),
    staleTime: 60000,
    retry: 1,
  });
};