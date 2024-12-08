import React from 'react';
import { render, screen } from '@testing-library/react';
import GameplaySessionCapture from '../components/GameplaySessionCapture';

// Unit test for the GameplaySessionCapture component
describe('GameplaySessionCapture Component', () => {
    test('renders gameplay session capture heading', () => {
        render(<GameplaySessionCapture />);
        const headingElement = screen.getByText(/Gameplay Session Capture/i);
        expect(headingElement).toBeInTheDocument();
    });

    test('captures session data correctly on submit', () => {
        render(<GameplaySessionCapture />);
        // Mock user inputs and simulate form submission
        const inputElement = screen.getByPlaceholderText(/Enter session data/i);
        const submitButton = screen.getByText(/Submit/i);
        fireEvent.change(inputElement, { target: { value: 'Session Data' } });
        fireEvent.click(submitButton);

        // Verify that data was captured (assuming we have a function that handles this)
        expect(mockedCaptureFunction).toHaveBeenCalledWith('Session Data');
    });

    test('shows error message when required field is empty', () => {
        render(<GameplaySessionCapture />);
        const submitButton = screen.getByText(/Submit/i);
        fireEvent.click(submitButton);

        const errorMessage = screen.getByText(/This field is required/i);
        expect(errorMessage).toBeInTheDocument();
    });
});
