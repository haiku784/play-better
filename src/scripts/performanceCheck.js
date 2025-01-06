// This script checks application performance after removing unused dependencies
const { execSync } = require('child_process');
const axios = require('axios');

// Function to check performance
async function checkPerformance(url) {
    console.log('Checking performance...');
    try {
        const startTime = Date.now();
        await axios.get(url);
        const loadTime = Date.now() - startTime;
        console.log(`Application loaded in ${loadTime} ms`);
        if (loadTime > 3000) {
            console.warn('Performance is not within acceptable limits.');
        } else {
            console.log('Performance is acceptable.');
        }
    } catch (error) {
        console.error('Error checking performance:', error);
    }
}

checkPerformance('http://localhost:3000'); // Update with your app URL