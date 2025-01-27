import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import FeedbackList from './FeedbackList';

// Mock fetch function
global.fetch = jest.fn(() => 
    Promise.resolve({
        json: () => Promise.resolve({ feedbacks: [{ rating: 5, comment: 'Great product!' }] })
    })
);

describe('FeedbackList Component', () => {
    test('renders loading state initially', () => {
        render(<FeedbackList productId="123" />);
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    test('renders feedbacks after loading', async () => {
        render(<FeedbackList productId="123" />);
        await waitFor(() => expect(screen.getByText(/Great product!/i)).toBeInTheDocument());
        expect(screen.getByText(/User Rating: 5/i)).toBeInTheDocument();
    });
});