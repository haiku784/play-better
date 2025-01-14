import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FeedbackMechanism from '../FeedbackMechanism';

test('displays success message on successful feedback submission', async () => {
    render(<FeedbackMechanism />);
    const button = screen.getByText(/submit feedback/i);
    fireEvent.click(button);

    const successMessage = await screen.findByText(/feedback submitted successfully!/i);
    expect(successMessage).toBeInTheDocument();
});

test('displays error message on failed feedback submission', async () => {
    const { getByText } = render(<FeedbackMechanism />);
    const button = getByText(/submit feedback/i);
    fireEvent.click(button);

    const errorMessage = await screen.findByText(/failed to submit feedback/i);
    expect(errorMessage).toBeInTheDocument();
});
