import React from 'react';
import PropTypes from 'prop-types';
import './ReportDownloadButton.css'; // Assuming a CSS file for styling

const ReportDownloadButton = ({ reportUrl, isEnabled, onDownload }) => {
  const handleDownload = () => {
    if (reportUrl && isEnabled) {
      const success = onDownload({ reportUrl });
      // Handle success or failure of download in UI if needed
      return success;
    }
    return false; // Download not initiated due to missing url or disabled button
  };

  return (
    <div className="tooltip">
      <button
        className={`download-button ${isEnabled ? 'enabled' : 'disabled'}`}
        onClick={handleDownload}
        disabled={!isEnabled}
      >
        <span className="download-icon">📥</span> Download Report
      </button>
      <span className="tooltip-text">Click to download the detailed performance report</span>
    </div>
  );
};

ReportDownloadButton.propTypes = {
  reportUrl: PropTypes.string.isRequired,
  isEnabled: PropTypes.bool.isRequired,
  onDownload: PropTypes.func.isRequired
};

export default ReportDownloadButton;