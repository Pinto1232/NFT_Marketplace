import apiClient from './apiClient';

// Fetch assets
export const fetchAssets = async (params = {}) => {
  const response = await apiClient.get('/assets', { params });
  return response.data.assets;
};

// Fetch a single asset
export const fetchAssetDetails = async (contractAddress, tokenId) => {
  const response = await apiClient.get(`/asset/${contractAddress}/${tokenId}`);
  return response.data;
};
