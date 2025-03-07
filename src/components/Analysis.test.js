import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Analysis from './Analysis';

/**
 * Mock fetch function to simulate API responses.
 */
global.fetch = jest.fn();

describe('Analysis Component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders loading state initially', () => {
        render(<Analysis />);
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    test('renders performance metrics on successful fetch', async () => {
        const mockMetrics = [
            { sessionId: '1', kills: 10, deaths: 2, assists: 5, accuracy: 75 },
            { sessionId: '2', kills: 8, deaths: 3, assists: 4, accuracy: 80 }
        ];
        fetch.mockResolvedValueOnce({ ok: true, json: jest.fn().mockResolvedValueOnce(mockMetrics) });

        render(<Analysis />);
        await waitFor(() => {
            expect(screen.getByText(/Session ID: 1/i)).toBeInTheDocument();
            expect(screen.getByText(/Kills: 10/i)).toBeInTheDocument();
            expect(screen.getByText(/Session ID: 2/i)).toBeInTheDocument();
        });
    });

    test('renders error message on fetch failure', async () => {
        fetch.mockRejectedValueOnce(new Error('Fetch error'));

        render(<Analysis />);
        await waitFor(() => {
            expect(screen.getByText(/Error: Fetch error/i)).toBeInTheDocument();
        });
    });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Analysis from './Analysis';

/**
 * Unit tests for the Analysis component.
 */
describe('Analysis Component', () => {
    test('renders loading state initially', () => {
        render(<Analysis />);
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    test('renders performance metrics on successful fetch', async () => {
        const mockMetrics = [
            { sessionId: '1', kills: 10, deaths: 2, assists: 5, accuracy: 75 },
            { sessionId: '2', kills: 8, deaths: 3, assists: 4, accuracy: 80 }
        ];
        global.fetch = jest.fn(() => Promise.resolve({
            ok: true,
            json: jest.fn().mockResolvedValueOnce(mockMetrics)
        }));

        render(<Analysis />);
        await waitFor(() => {
            expect(screen.getByText(/Session ID: 1/i)).toBeInTheDocument();
            expect(screen.getByText(/Kills: 10/i)).toBeInTheDocument();
            expect(screen.getByText(/Session ID: 2/i)).toBeInTheDocument();
        });
    });

    test('renders error message on fetch failure', async () => {
        global.fetch = jest.fn(() => Promise.reject(new Error('Fetch error')));

        render(<Analysis />);
        await waitFor(() => {
            expect(screen.getByText(/Error: Fetch error/i)).toBeInTheDocument();
        });
    });
});