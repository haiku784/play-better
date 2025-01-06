// This script helps to optimize the React application bundle size after removing unused dependencies
const { execSync } = require('child_process');

// Optimize bundle size by running build command
function optimizeBundle() {
    console.log('Optimizing bundle size...');
    execSync('npm run build', { stdio: 'inherit' });
    console.log('Bundle optimized successfully.');
}

optimizeBundle();