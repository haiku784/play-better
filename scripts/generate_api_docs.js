const fs = require('fs');
const path = require('path');

// Function to generate API documentation from specifications
function generateAPIDocs() {
    const specificationsPath = path.join(__dirname, 'api', 'specifications');
    const outputPath = path.join(__dirname, 'docs', 'api_docs.md');

    // Read all specifications files
    fs.readdir(specificationsPath, (err, files) => {
        if (err) {
            console.error('Error reading specifications:', err);
            return;
        }

        let documentation = '# API Documentation

';

        files.forEach(file => {
            const filePath = path.join(specificationsPath, file);
            const fileContent = fs.readFileSync(filePath, 'utf8');
            documentation += `## ${file.replace(/_/g, ' ')}

` + fileContent + '

';
        });

        // Write documentation to a Markdown file
        fs.writeFileSync(outputPath, documentation);
        console.log('API documentation generated successfully at', outputPath);
    });
}

generateAPIDocs();