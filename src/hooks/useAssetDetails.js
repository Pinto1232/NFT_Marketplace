import { useQuery } from '@tanstack/react-query';
import { fetchAssetDetails } from '../services/openseaService';

export const useAssetDetails = (contractAddress, tokenId) => {
  return useQuery({
    queryKey: ['assetDetails', contractAddress, tokenId],
    queryFn: () => fetchAssetDetails(contractAddress, tokenId),
    staleTime: 60000,
  });
};
