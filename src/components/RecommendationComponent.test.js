import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import RecommendationComponent from './RecommendationComponent';

/**
 * Mock fetch function to simulate API responses.
 */
global.fetch = jest.fn();

describe('RecommendationComponent', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('displays loading state initially', () => {
        render(<RecommendationComponent />);
        expect(screen.getByText(/Loading recommendations.../i)).toBeInTheDocument();
    });

    test('displays recommendations on successful fetch', async () => {
        const mockRecommendations = [
            { recommendationId: '1', hardware: 'NVIDIA RTX 3080', gameConfig: 'High Settings' },
            { recommendationId: '2', hardware: 'AMD Ryzen 7 5800X', gameConfig: 'Ultra Settings' }
        ];
        fetch.mockResolvedValueOnce({ ok: true, json: jest.fn().mockResolvedValueOnce(mockRecommendations) });

        render(<RecommendationComponent />);

        await waitFor(() => {
            expect(screen.getByText(/NVIDIA RTX 3080/i)).toBeInTheDocument();
            expect(screen.getByText(/AMD Ryzen 7 5800X/i)).toBeInTheDocument();
        });
    });

    test('displays error message on fetch failure', async () => {
        fetch.mockResolvedValueOnce({ ok: false });

        render(<RecommendationComponent />);

        await waitFor(() => {
            expect(screen.getByText(/Error:/i)).toBeInTheDocument();
        });
    });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RecommendationComponent from './RecommendationComponent';

/**
 * Unit tests for RecommendationComponent.
 */
describe('RecommendationComponent', () => {
    test('displays loading state initially', () => {
        render(<RecommendationComponent />);
        expect(screen.getByText(/Loading recommendations.../i)).toBeInTheDocument();
    });

    test('displays recommendations on successful fetch', async () => {
        const mockRecommendations = [
            { recommendationId: '1', hardware: 'NVIDIA RTX 3080', gameConfig: 'High Settings' },
            { recommendationId: '2', hardware: 'AMD Ryzen 7 5800X', gameConfig: 'Ultra Settings' }
        ];
        global.fetch = jest.fn(() => Promise.resolve({
            ok: true,
            json: jest.fn().mockResolvedValueOnce(mockRecommendations)
        }));

        render(<RecommendationComponent />);
        await waitFor(() => {
            expect(screen.getByText(/NVIDIA RTX 3080/i)).toBeInTheDocument();
            expect(screen.getByText(/AMD Ryzen 7 5800X/i)).toBeInTheDocument();
        });
    });

    test('displays error message on fetch failure', async () => {
        global.fetch = jest.fn(() => Promise.resolve({ ok: false }));

        render(<RecommendationComponent />);
        await waitFor(() => {
            expect(screen.getByText(/Error:/i)).toBeInTheDocument();
        });
    });
});