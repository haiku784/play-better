// Handle database errors
async function databaseErrorHandler(err) {
    console.error('Database Error:', err);
    throw new Error('Internal Server Error');
}

module.exports = databaseErrorHandler;