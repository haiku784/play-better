const handleSubmit = async (data) => {
    const { match_id, event_types, time_range } = data;
    try {
        const response = await fetch('/api/highlight-events', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ match_id, event_types, time_range }),
        });
        const submissionResponse = await response.json();

        if (!response.ok) {
            throw new Error(submissionResponse.message || 'Submission failed');
        }
        return submissionResponse;
    } catch (error) {
        console.error('Submission error:', error);
        throw error;
    }
};