import axios from 'axios';
import { GearRecommendation } from '../types';

const BASE_URL = 'http://localhost:8000/api';

export const getGearRecommendations = async (): Promise<GearRecommendation[]> => {
    const response = await axios.get(`${BASE_URL}/gear-recommendations`);
    return response.data;
};