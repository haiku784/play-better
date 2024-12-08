/**
 * API Service Module to interact with backend API
 * @module apiService
 */

const axios = require('axios');

const API_BASE_URL = 'https://api.example.com';

/**
 * Function to submit metrics to the API
 * @param {Object} metrics - The metrics data to submit
 * @returns {Promise} - The API response
 */
const submitMetrics = async (metrics) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/metrics`, metrics);
        return response.data;
    } catch (error) {
        console.error('Error submitting metrics:', error);
        throw error;
    }
};

/**
 * Function to retrieve metrics from the API
 * @returns {Promise} - The metrics data
 */
const getMetrics = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/metrics`);
        return response.data;
    } catch (error) {
        console.error('Error retrieving metrics:', error);
        throw error;
    }
};

module.exports = {
    submitMetrics,
    getMetrics
};