// Callback function triggered when the overlay starts
const onOverlayStart = ({ session_id, status }) => {
    // Logic to handle overlay start
    console.log(`Overlay started for session: ${session_id} with status: ${status}`);
    return { confirmation: 'Overlay has started successfully.' };
};