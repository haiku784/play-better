import axios from 'axios';

export const fetchComparativeMetrics = async (): Promise<any> => {
  const response = await axios.get('/api/comparative-metrics');
  return response.data;
};