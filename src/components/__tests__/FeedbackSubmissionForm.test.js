import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import FeedbackSubmissionForm from './FeedbackSubmissionForm';

jest.mock('./feedbackService', () => ({
    submitFeedback: jest.fn(),
}));

describe('FeedbackSubmissionForm', () => {
    test('submits feedback successfully', async () => {
        const mockOnSubmissionSuccess = jest.fn();
        const mockOnSubmissionFailure = jest.fn();
        const { getByPlaceholderText, getByText } = render(
            <FeedbackSubmissionForm
                onSubmissionSuccess={mockOnSubmissionSuccess}
                onSubmissionFailure={mockOnSubmissionFailure}
            />
        );

        fireEvent.change(getByPlaceholderText('User ID'), { target: { value: 'user123' } });
        fireEvent.change(getByPlaceholderText('Product ID'), { target: { value: 'product456' } });
        fireEvent.change(getByPlaceholderText('rating'), { target: { value: '5' } });
        fireEvent.change(getByPlaceholderText('Your comments...'), { target: { value: 'Great product!' } });
        fireEvent.click(getByText('Submit Feedback'));

        await waitFor(() => expect(mockOnSubmissionSuccess).toHaveBeenCalled());
    });

    test('handles submission failure', async () => {
        const mockOnSubmissionSuccess = jest.fn();
        const mockOnSubmissionFailure = jest.fn();
        const { getByPlaceholderText, getByText } = render(
            <FeedbackSubmissionForm
                onSubmissionSuccess={mockOnSubmissionSuccess}
                onSubmissionFailure={mockOnSubmissionFailure}
            />
        );

        fireEvent.change(getByPlaceholderText('User ID'), { target: { value: 'user123' } });
        fireEvent.change(getByPlaceholderText('Product ID'), { target: { value: 'product456' } });
        fireEvent.change(getByPlaceholderText('rating'), { target: { value: '5' } });
        fireEvent.change(getByPlaceholderText('Your comments...'), { target: { value: 'Great product!' } });
        fireEvent.click(getByText('Submit Feedback'));

        await waitFor(() => expect(mockOnSubmissionFailure).toHaveBeenCalledWith({ error: 'Failed to submit feedback.' }));
    });
});