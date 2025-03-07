import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Analysis from './Analysis';

/**
 * Mock fetch function to simulate API responses.
 */
global.fetch = jest.fn();

describe('Analysis Component', () => {
    const sessionId = '12345';

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders loading state initially', () => {
        fetch.mockImplementation(() => Promise.resolve({ ok: true, json: () => Promise.resolve({}) }));
        render(<Analysis sessionId={sessionId} />);
        expect(screen.getByText(/Loading analysis data.../i)).toBeInTheDocument();
    });

    test('renders analysis data', async () => {
        const mockData = {
            killDeathRatio: 1.5,
            accuracy: 75,
            objectivesCompleted: 3,
            insights: 'Great performance overall!'
        };
        fetch.mockImplementation(() => Promise.resolve({ ok: true, json: () => Promise.resolve(mockData) }));
        render(<Analysis sessionId={sessionId} />);
        await waitFor(() => expect(screen.getByText(/Analysis Results for Session 12345/i)).toBeInTheDocument());
        expect(screen.getByText(/Kill"/Death Ratio: 1.5/i)).toBeInTheDocument();
        expect(screen.getByText(/Accuracy: 75/i)).toBeInTheDocument();
        expect(screen.getByText(/Objectives Completed: 3/i)).toBeInTheDocument();
        expect(screen.getByText(/Great performance overall!/i)).toBeInTheDocument();
    });

    test('renders error state', async () => {
        fetch.mockImplementation(() => Promise.resolve({ ok: false }));
        render(<Analysis sessionId={sessionId} />);
        await waitFor(() => expect(screen.getByText(/Error: Failed to fetch analysis data/i)).toBeInTheDocument());
    });
});