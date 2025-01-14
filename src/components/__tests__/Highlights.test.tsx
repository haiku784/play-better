import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Highlights from '../Highlights';
import axios from 'axios';

jest.mock('axios');

describe('Highlights Component', () => {
    test('renders loading state', () => {
        render(<Highlights />);
        expect(screen.getByText(/Loading highlights.../i)).toBeInTheDocument();
    });
    test('renders error message on failure', async () => {
        (axios.get as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));
        render(<Highlights />);
        await waitFor(() => {
            expect(screen.getByText(/Failed to fetch highlights/i)).toBeInTheDocument();
        });
    });
});