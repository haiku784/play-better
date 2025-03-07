// src/components/RecommendationList.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import RecommendationList from './RecommendationList';

/**
 * Mock fetch function to simulate API calls.
 */
global.fetch = jest.fn();

describe('RecommendationList', () => {
    const userId = 1;

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders loading state', () => {
        fetch.mockImplementationOnce(() => Promise.resolve({ ok: true, json: () => Promise.resolve([]) }));
        render(<RecommendationList userId={userId} />);
        expect(screen.getByText(/Loading recommendations/i)).toBeInTheDocument();
    });

    test('renders recommendations', async () => {
        const mockRecommendations = [
            { recommendationId: 1, type: 'Gear', details: 'High-end gaming mouse', rating: 5, review: 'Best mouse ever!' },
            { recommendationId: 2, type: 'Config', details: 'Optimal settings for FPS', rating: 4, review: 'Improves gameplay significantly.' }
        ];
        fetch.mockImplementationOnce(() => Promise.resolve({ ok: true, json: () => Promise.resolve(mockRecommendations) }));
        render(<RecommendationList userId={userId} />);
        await waitFor(() => expect(screen.getByText(/Your Recommendations/i)).toBeInTheDocument());
        expect(screen.getByText(/High-end gaming mouse/i)).toBeInTheDocument();
        expect(screen.getByText(/Optimal settings for FPS/i)).toBeInTheDocument();
    });

    test('renders error message', async () => {
        fetch.mockImplementationOnce(() => Promise.reject(new Error('API is down')));
        render(<RecommendationList userId={userId} />);
        await waitFor(() => expect(screen.getByText(/Error:/i)).toBeInTheDocument());
    });
});