import axios from 'axios';
import { PerformanceMetric } from '../types';

export const fetchPerformanceMetrics = async (filters: object): Promise<PerformanceMetric[]> => {
    const response = await axios.get('/api/performance-metrics', { params: filters });
    return response.data;
};