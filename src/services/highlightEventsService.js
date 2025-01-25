import axios from 'axios';

const highlightEventsService = async ({ match_id, event_types, time_range }) => {
  try {
    const response = await axios.post('/api/highlightEvents', { match_id, event_types, time_range });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch highlighted events.');
  }
};

export default highlightEventsService;