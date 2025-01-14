import axios from 'axios';
import { GearOption } from '../types';

const API_ENDPOINT = '/api/gearmetrics';

export const fetchComparativeMetrics = async (gearIds: string[]): Promise<GearOption[]> => {
    const response = await axios.post(`${API_ENDPOINT}/compare`, { gearIds });
    return response.data;
};