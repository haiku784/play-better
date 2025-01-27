import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import FeedbackSubmissionForm from './FeedbackSubmissionForm';

describe('FeedbackSubmissionForm', () => {
    test('should submit feedback successfully', async () => {
        const mockOnSubmissionSuccess = jest.fn();
        const mockOnSubmissionFailure = jest.fn();

        const { getByPlaceholderText, getByText } = render(
            <FeedbackSubmissionForm
                onSubmissionSuccess={mockOnSubmissionSuccess}
                onSubmissionFailure={mockOnSubmissionFailure}
            />
        );

        fireEvent.change(getByPlaceholderText('User ID'), { target: { value: 'user123' } });
        fireEvent.change(getByPlaceholderText('Product ID'), { target: { value: 'product123' } });
        fireEvent.change(getByPlaceholderText('Rating'), { target: { value: '5' } });
        fireEvent.change(getByPlaceholderText('Comments'), { target: { value: 'Great product!' } });

        fireEvent.click(getByText('Submit Feedback'));

        // Wait for the success callback to be called
        await waitFor(() => {
            expect(mockOnSubmissionSuccess).toHaveBeenCalled();
        });
    });

    test('should handle submission failure', async () => {
        const mockOnSubmissionSuccess = jest.fn();
        const mockOnSubmissionFailure = jest.fn();

        jest.spyOn(global, 'mockApiSubmitFeedback').mockImplementationOnce(() => {
            return Promise.reject(new Error('Submission failed.'));
        });

        const { getByPlaceholderText, getByText } = render(
            <FeedbackSubmissionForm
                onSubmissionSuccess={mockOnSubmissionSuccess}
                onSubmissionFailure={mockOnSubmissionFailure}
            />
        );

        fireEvent.change(getByPlaceholderText('User ID'), { target: { value: 'user123' } });
        fireEvent.change(getByPlaceholderText('Product ID'), { target: { value: 'product123' } });
        fireEvent.change(getByPlaceholderText('Rating'), { target: { value: '5' } });

        fireEvent.click(getByText('Submit Feedback'));

        // Wait for the failure callback to be called
        await waitFor(() => {
            expect(mockOnSubmissionFailure).toHaveBeenCalled();
        });
    });
});