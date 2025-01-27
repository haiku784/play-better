import React, { useState } from 'react';

const PerformanceMetricsAnalysisReport = ({ outputVideoUrl }) => {
    const [analysisReport, setAnalysisReport] = useState(null);
    const [loading, setLoading] = useState(false);

    const analyzeOverlayedVideo = async (url) => {
        try {
            setLoading(true);
            const response = await fetch(`/api/analyze?videoUrl=${encodeURIComponent(url)}`);
            const data = await response.json();
            onAnalysisComplete(data.analysis_report);
        } catch (error) {
            onAnalysisError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const onAnalysisComplete = (report) => {
        setAnalysisReport(report);
        console.log('Analysis complete!', report);
    };

    const onAnalysisError = (errorMessage) => {
        console.error('Analysis error:', errorMessage);
    };

    return (
        <div>
            <button onClick={() => analyzeOverlayedVideo(outputVideoUrl)} disabled={loading}>
                {loading ? 'Analyzing...' : 'Analyze Metrics'}
            </button>
            {loading && <div className="loadingIndicator">Loading...</div>}
            {analysisReport && <div className="reportContainer">{JSON.stringify(analysisReport)}</div>}
        </div>
    );
};

export default PerformanceMetricsAnalysisReport;