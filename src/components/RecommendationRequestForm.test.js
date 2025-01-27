import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import RecommendationRequestForm from './RecommendationRequestForm';

describe('RecommendationRequestForm', () => {
    test('renders form fields and submits data', async () => {
        const handleSubmitSuccess = jest.fn();
        const handleSubmitError = jest.fn();

        render(<RecommendationRequestForm onSubmitSuccess={handleSubmitSuccess} onSubmitError={handleSubmitError} />);

        // Input user ID
        fireEvent.change(screen.getByPlaceholderText(/user id/i), { target: { value: '123' } });
        // Input preferences
        fireEvent.change(screen.getByPlaceholderText(/preferences/i), { target: { value: JSON.stringify({ gameTypes: ['Shooter'], brands: ['BrandA'], priceRange: [100, 500] }) } });
        // Input feedback score
        fireEvent.change(screen.getByPlaceholderText(/feedback score/i), { target: { value: 4 } });

        // Submit form
        fireEvent.click(screen.getByText(/submit/i));

        // Await for success callback to be called
        await screen.findByText(/loading/i);
        // Simulate API success response
        expect(handleSubmitSuccess).toHaveBeenCalled();
    });

    test('handles error on submit', async () => {
        const handleSubmitSuccess = jest.fn();
        const handleSubmitError = jest.fn();

        render(<RecommendationRequestForm onSubmitSuccess={handleSubmitSuccess} onSubmitError={handleSubmitError} />);

        // Input user ID
        fireEvent.change(screen.getByPlaceholderText(/user id/i), { target: { value: '123' } });
        // Input preferences
        fireEvent.change(screen.getByPlaceholderText(/preferences/i), { target: { value: JSON.stringify({}) } });

        // Submit form
        fireEvent.click(screen.getByText(/submit/i));

        // Await for error message to be displayed
        expect(handleSubmitError).toHaveBeenCalled();
        expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
});