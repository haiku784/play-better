/**
 * Analytics Service Unit Tests
 * Testing the Analytics component using Jest and React Testing Library.
 */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Analytics from './Analytics';

// Mocking the fetch API
global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
            { date: '2023-01-01', metric: 'Blood Pressure', value: '120/80' },
            { date: '2023-01-02', metric: 'Heart Rate', value: '72 bpm' }
        ]),
    })
);

describe('Analytics Component', () => {
    test('renders loading state', () => {
        render(<Analytics />);
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    test('renders health data after fetch', async () => {
        render(<Analytics />);
        await waitFor(() => expect(screen.getByText(/Health Data Trends/i)).toBeInTheDocument());
        expect(screen.getByText(/Blood Pressure/i)).toBeInTheDocument();
        expect(screen.getByText(/120"/80/i)).toBeInTheDocument();
    });

    test('renders error message on fetch failure', async () => {
        fetch.mockImplementationOnce(() => Promise.reject(new Error('Fetch failed')));
        render(<Analytics />);
        await waitFor(() => expect(screen.getByText(/Error: Fetch failed/i)).toBeInTheDocument());
    });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import Analytics from './Analytics';

/**
 * Unit tests for Analytics component.
 */
describe('Analytics Component', () => {
    test('renders loading state', () => {
        render(<Analytics />);
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    test('renders health data after fetch', async () => {
        render(<Analytics />);
        await waitFor(() => expect(screen.getByText(/Health Data Trends/i)).toBeInTheDocument());
        expect(screen.getByText(/Blood Pressure/i)).toBeInTheDocument();
        expect(screen.getByText(/120"/80/i)).toBeInTheDocument();
    });

    test('renders error message on fetch failure', async () => {
        fetch.mockImplementationOnce(() => Promise.reject(new Error('Fetch failed')));
        render(<Analytics />);
        await waitFor(() => expect(screen.getByText(/Error: Fetch failed/i)).toBeInTheDocument());
    });
});