import apiClient from './apiClient';

export const fetchCollections = async (params = {}) => {
  const response = await apiClient.get('/collections/v7', {
    params: {
      orderDirection: 'desc',
      limit: 10,
      ...params
    }
  });
  return response.data.collections;
};

// Fetch single collection
export const fetchCollectionDetails = async (collectionId) => {
  const response = await apiClient.get(`/collections/v7/${collectionId}`);
  return response.data;
};