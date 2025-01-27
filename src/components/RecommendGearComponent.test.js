import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RecommendGearComponent from './RecommendGearComponent';

/**
 * Test suite for RecommendGearComponent.
 */
describe('RecommendGearComponent', () => {
    it('renders correctly and allows user input', () => {
        render(<RecommendGearComponent />);
        expect(screen.getByPlaceholderText('User ID')).toBeInTheDocument();
        expect(screen.getByText('Get Recommendations')).toBeInTheDocument();
    });

    it('shows error message when API call fails', async () => {
        // Mock the fetch to simulate an error response
        global.fetch = jest.fn(() => Promise.reject({
            message: 'Network error',
        }));

        render(<RecommendGearComponent />);
        fireEvent.change(screen.getByPlaceholderText('User ID'), { target: { value: 'test_user' } });
        fireEvent.change(screen.getByRole('combobox'), { target: { value: 'FPS' } });
        fireEvent.click(screen.getByText('Get Recommendations'));

        // Wait for the error message to appear
        const errorMessage = await screen.findByText(/Network error/i);
        expect(errorMessage).toBeInTheDocument();
    });
});