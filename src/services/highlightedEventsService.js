/**
 * Handles the click event on a highlighted item to fetch details.
 * @param {string} event_id - The unique identifier of the highlight event.
 * @returns {Object} - Details of the clicked highlight event.
 */
const handleHighlightClick = (event_id) => {
    // Fetch event details based on event_id
    return fetchEventDetails(event_id);
};