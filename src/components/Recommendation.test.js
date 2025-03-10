/**
 * Recommendation Service Tests
 * This file contains unit tests and integration tests for the Recommendation component.
 */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Recommendation from './Recommendation';

/**
 * Mocking the fetch API to simulate API responses.
 */
global.fetch = jest.fn();

describe('Recommendation Component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders loading state initially', () => {
        render(<Recommendation />);
        expect(screen.getByText(/Loading recommendations.../i)).toBeInTheDocument();
    });

    test('renders recommendations on successful fetch', async () => {
        const mockRecommendations = [
            { id: 1, title: 'Drink more water', description: 'Aim for 8 glasses a day.' },
            { id: 2, title: 'Regular exercise', description: 'At least 30 minutes a day.' }
        ];
        fetch.mockResolvedValueOnce({ ok: true, json: jest.fn().mockResolvedValueOnce(mockRecommendations) });

        render(<Recommendation />);

        await waitFor(() => {
            expect(screen.getByText(/Personalized Health Recommendations/i)).toBeInTheDocument();
        });
        expect(screen.getByText(/Drink more water/i)).toBeInTheDocument();
        expect(screen.getByText(/Regular exercise/i)).toBeInTheDocument();
    });

    test('renders error message on fetch failure', async () => {
        fetch.mockRejectedValueOnce(new Error('Fetch error'));

        render(<Recommendation />);

        await waitFor(() => {
            expect(screen.getByText(/Error: Fetch error/i)).toBeInTheDocument();
        });
    });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import Recommendation from './Recommendation';

/**
 * Unit tests for Recommendation component.
 */
describe('Recommendation Component', () => {
    test('renders loading state initially', () => {
        render(<Recommendation />);
        expect(screen.getByText(/Loading recommendations.../i)).toBeInTheDocument();
    });

    test('renders recommendations on successful fetch', async () => {
        const mockRecommendations = [
            { id: 1, title: 'Drink more water', description: 'Aim for 8 glasses a day.' },
            { id: 2, title: 'Regular exercise', description: 'At least 30 minutes a day.' }
        ];
        fetch.mockResolvedValueOnce({ ok: true, json: jest.fn().mockResolvedValueOnce(mockRecommendations) });

        render(<Recommendation />);

        await waitFor(() => {
            expect(screen.getByText(/Personalized Health Recommendations/i)).toBeInTheDocument();
        });
        expect(screen.getByText(/Drink more water/i)).toBeInTheDocument();
        expect(screen.getByText(/Regular exercise/i)).toBeInTheDocument();
    });

    test('renders error message on fetch failure', async () => {
        fetch.mockRejectedValueOnce(new Error('Fetch error'));

        render(<Recommendation />);

        await waitFor(() => {
            expect(screen.getByText(/Error: Fetch error/i)).toBeInTheDocument();
        });
    });
});