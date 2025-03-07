import React from 'react';
import { render, screen } from '@testing-library/react';
import Recommendation from './Recommendation';

/**
 * Mock fetch function for testing.
 */
global.fetch = jest.fn();

describe('Recommendation Component', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    test('renders loading state', () => {
        fetch.mockImplementationOnce(() => Promise.resolve({ ok: true, json: () => Promise.resolve([]) }));
        render(<Recommendation userId="1" />);
        expect(screen.getByText(/Loading recommendations.../i)).toBeInTheDocument();
    });

    test('renders recommendations', async () => {
        const mockRecommendations = [{ id: '1', title: 'Game A', description: 'Description A' }, { id: '2', title: 'Game B', description: 'Description B' }];
        fetch.mockImplementationOnce(() => Promise.resolve({ ok: true, json: () => Promise.resolve(mockRecommendations) }));
        render(<Recommendation userId="1" />);
        expect(await screen.findByText(/Game A/i)).toBeInTheDocument();
        expect(await screen.findByText(/Game B/i)).toBeInTheDocument();
    });

    test('renders error message', async () => {
        fetch.mockImplementationOnce(() => Promise.resolve({ ok: false }));
        render(<Recommendation userId="1" />);
        expect(await screen.findByText(/Error:/i)).toBeInTheDocument();
    });
});