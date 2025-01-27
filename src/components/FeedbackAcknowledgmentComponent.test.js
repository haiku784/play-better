import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import FeedbackAcknowledgmentComponent from './FeedbackAcknowledgmentComponent';

// Mocking the fetch function
global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve({ status: 'success', message: 'Acknowledgment sent!' }) }));

describe('FeedbackAcknowledgmentComponent', () => {
    test('renders correctly', () => {
        const { getByPlaceholderText, getByText } = render(<FeedbackAcknowledgmentComponent />);
        expect(getByPlaceholderText('User ID')).toBeInTheDocument();
        expect(getByPlaceholderText('Feedback ID')).toBeInTheDocument();
        expect(getByPlaceholderText('Optional message')).toBeInTheDocument();
        expect(getByText('Submit')).toBeInTheDocument();
    });

    test('submits acknowledgment and displays success message', async () => {
        const { getByPlaceholderText, getByText } = render(<FeedbackAcknowledgmentComponent />);
        fireEvent.change(getByPlaceholderText('User ID'), { target: { value: '12345' } });
        fireEvent.change(getByPlaceholderText('Feedback ID'), { target: { value: '54321' } });
        fireEvent.change(getByPlaceholderText('Optional message'), { target: { value: 'Thank you!' } });
        fireEvent.click(getByText('Submit'));

        const responseMessage = await waitFor(() => getByText('Acknowledgment sent!'));
        expect(responseMessage).toBeInTheDocument();
    });
});