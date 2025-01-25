import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api', 
  headers: {
    'x-api-key': import.meta.env.VITE_RESERVOIR_API_KEY || 'd1435673-6e7f-56bc-9697-7a64dd8d7ac2',
  },
});

export default apiClient;