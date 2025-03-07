// src/tests/AnalysisService.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import AnalysisService from '../components/AnalysisService';

/**
 * Mocking the fetch API to simulate API responses for testing.
 */
global.fetch = jest.fn();

describe('AnalysisService Component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders loading state', () => {
        fetch.mockImplementationOnce(() => Promise.resolve({ ok: true, json: () => Promise.resolve([]) }));
        render(<AnalysisService />);
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    test('renders performance metrics', async () => {
        const mockData = [{
            metricsId: 1,
            kills: 10,
            deaths: 5,
            assists: 3,
            accuracy: 75,
            decisionScore: 85
        }];
        fetch.mockImplementationOnce(() => Promise.resolve({ ok: true, json: () => Promise.resolve(mockData) }));
        render(<AnalysisService />);
        await waitFor(() => expect(screen.getByText(/Performance Metrics/i)).toBeInTheDocument());
        expect(screen.getByText(/10/i)).toBeInTheDocument();
        expect(screen.getByText(/5/i)).toBeInTheDocument();
    });

    test('renders error message', async () => {
        fetch.mockImplementationOnce(() => Promise.reject(new Error('Network error')));
        render(<AnalysisService />);
        await waitFor(() => expect(screen.getByText(/Error:/i)).toBeInTheDocument());
    });
});