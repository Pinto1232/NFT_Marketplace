import { useQuery } from '@tanstack/react-query';
import { fetchAssets } from '../services/openseaService';

export const useOpenseaAssets = (params) => {
  return useQuery({
    queryKey: ['openseaAssets', params],
    queryFn: () => fetchAssets(params),
    staleTime: 60000, // Cache for 1 minute
    retry: 1, // Retry failed requests once
  });
};
