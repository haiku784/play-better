import React from 'react';
import PropTypes from 'prop-types';

const DeleteHighlight = ({ highlightId, onDelete }) => {
  const handleDelete = () => {
    // Call the onDelete prop which is a function to delete the highlight
    onDelete(highlightId);
  };

  return (
    <button onClick={handleDelete} className="delete-highlight-button">
      Delete Highlight
    </button>
  );
};

DeleteHighlight.propTypes = {
  highlightId: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteHighlight;