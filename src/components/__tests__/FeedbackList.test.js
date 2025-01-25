import React from 'react';
import { render, screen } from '@testing-library/react';
import FeedbackList from '../FeedbackList';

// Mocking the feedback service
jest.mock('../../services/feedbackService', () => ({
    retrieveFeedbacks: jest.fn(() => Promise.resolve({ feedbacks: [] }))
}));

describe('FeedbackList', () => {
    test('renders loading state initially', () => {
        render(<FeedbackList productId='123' />);
        expect(screen.getByText(/Loading feedbacks.../i)).toBeInTheDocument();
    });

    test('renders feedback list after loading', async () => {
        // Mock implementation for retrieved feedbacks
        const mockFeedbacks = [{ rating: 5, comment: 'Excellent product!' }];
        require('../../services/feedbackService').retrieveFeedbacks.mockImplementationOnce(() => Promise.resolve({ feedbacks: mockFeedbacks }));

        render(<FeedbackList productId='123' />);

        // Wait for feedbacks to load
        expect(await screen.findByText(/Excellent product!/i)).toBeInTheDocument();
    });
});