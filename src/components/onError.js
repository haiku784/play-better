// Callback function triggered when an error occurs during overlay operations
const onError = (error_message) => {
    // Logic to handle errors
    console.error(`Error occurred: ${error_message}`);
    return { acknowledgment: 'Error message received.' };
};