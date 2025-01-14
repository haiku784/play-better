import axios from 'axios';
import useFeedback from '../hooks/useFeedback';

const shareGameplaySession = async (sessionId) => {
    const { addNotification } = useFeedback();
    try {
        const response = await axios.post(`/api/share-session/${sessionId}`);
        if (response.data.success) {
            addNotification('Session shared successfully!', 'success');
        } else {
            addNotification('Failed to share the session. Please try again.', 'error');
        }
    } catch (error) {
        addNotification('Network error, please check your connection.', 'error');
    }
};

export default shareGameplaySession;