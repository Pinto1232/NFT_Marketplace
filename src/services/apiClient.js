import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://api.reservoir.tools/collections/v7 ',
    headers: {
      'X-API-KEY': import.meta.env.VITE_OPENSEA_API_KEY || 'd1435673-6e7f-56bc-9697-7a64dd8d7ac2',
    },
  });
  

export default apiClient;
