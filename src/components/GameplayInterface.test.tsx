import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import GameplaySessionSelector from './GameplayInterface';
import axios from 'axios';

jest.mock('axios');

describe('GameplaySessionSelector', () => {
    test('renders loading state', () => {
        render(<GameplaySessionSelector />);
        expect(screen.getByText(/loading sessions/i)).toBeInTheDocument();
    });

    test('renders session list on successful fetch', async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: [{ id: '1', title: 'Session 1', date: '2023-01-01' }] });
        render(<GameplaySessionSelector />);
        await waitFor(() => expect(screen.getByText(/Session 1/i)).toBeInTheDocument());
    });

    test('renders error message on failed fetch', async () => {
        (axios.get as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));
        render(<GameplaySessionSelector />);
        await waitFor(() => expect(screen.getByText(/failed to fetch gameplay sessions/i)).toBeInTheDocument());
    });
});