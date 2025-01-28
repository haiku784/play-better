/**
 * Callback function to handle the report download initiation.
 * @param {Object} params - Parameters containing report URL.
 * @param {string} params.reportUrl - The URL of the report to be downloaded.
 * @returns {boolean} - Indicates if the download was successful.
 */
const reportDownloadCallback = async ({ reportUrl }) => {
  try {
    const response = await fetch(reportUrl);
    if (!response.ok) throw new Error('Network response was not ok');

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'report.pdf'; // Assuming PDF format for the report
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    return true; // Download successful
  } catch (error) {
    console.error('Download error:', error);
    return false; // Download failed
  }
};

export default reportDownloadCallback;