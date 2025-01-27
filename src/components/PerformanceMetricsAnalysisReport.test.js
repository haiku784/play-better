import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import PerformanceMetricsAnalysisReport from './PerformanceMetricsAnalysisReport';

jest.mock('node-fetch');
const fetch = require('node-fetch');

describe('PerformanceMetricsAnalysisReport', () => {
    it('should render and analyze video metrics', async () => {
        fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue({ analysis_report: { success: true } })
        });

        const { getByText } = render(<PerformanceMetricsAnalysisReport outputVideoUrl="http://example.com/video.mp4" />);

        fireEvent.click(getByText('Analyze Metrics'));

        await waitFor(() => expect(getByText('Analyzing...')).toBeInTheDocument());
        await waitFor(() => expect(getByText('{