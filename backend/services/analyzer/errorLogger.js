const fs = require('fs');

function logErrorToFile(errorMessage) {
    const logMessage = `${new Date().toISOString()} - ERROR: ${errorMessage}"
`;
    fs.appendFile('analyzer_errors.log', logMessage, (err) => {
        if (err) throw err;
    });
}

module.exports = logErrorToFile;