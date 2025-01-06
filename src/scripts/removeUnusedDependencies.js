// This script checks for unused dependencies in package.json and removes them
const fs = require('fs');
const { execSync } = require('child_process');

// Read package.json file
const packageJsonPath = './package.json';
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Function to identify unused dependencies
function findUnusedDependencies(dependencies, devDependencies) {
    // We would normally use a tool like depcheck for this
    // For our purpose, we'll assume an array of unused dependencies for demonstration
    const unused = ['some-unused-package']; // This should come from an actual detection logic
    return unused;
}

// Find unused dependencies
const unusedDependencies = findUnusedDependencies(packageJson.dependencies, packageJson.devDependencies);

// Remove unused dependencies from package.json
if (unusedDependencies.length > 0) {
    unusedDependencies.forEach(dep => {
        delete packageJson.dependencies[dep];
        console.log(`Removed unused dependency: ${dep}`);
    });

    // Write updated package.json back to file
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    // Run npm install to clean up node_modules
    execSync('npm install', { stdio: 'inherit' });
} else {
    console.log('No unused dependencies found.');
}