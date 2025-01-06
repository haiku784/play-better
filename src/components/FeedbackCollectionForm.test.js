import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import FeedbackCollectionForm from './FeedbackCollectionForm';

/**
 * Test suite for the FeedbackCollectionForm component.
 */
describe('FeedbackCollectionForm', () => {
    test('renders form elements', () => {
        render(<FeedbackCollectionForm />);
        expect(screen.getByLabelText(/Your Name:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Your Feedback:/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /submit feedback/i })).toBeInTheDocument();
    });

    test('submits feedback', () => {
        render(<FeedbackCollectionForm />);
        fireEvent.change(screen.getByLabelText(/Your Name:/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/Your Feedback:/i), { target: { value: 'Great feature!' } });
        fireEvent.click(screen.getByRole('button', { name: /submit feedback/i }));
        expect(screen.getByText(/thank you for your feedback/i)).toBeInTheDocument();
    });
});