// Callback function triggered when the overlay stops
const onOverlayStop = ({ session_id, status }) => {
    // Logic to handle overlay stop
    console.log(`Overlay stopped for session: ${session_id} with status: ${status}`);
    return { confirmation: 'Overlay has stopped successfully.' };
};