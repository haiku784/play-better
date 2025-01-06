import React from 'react';
import { render, screen } from '@testing-library/react';
import FormComponent from './FormComponent';

/**
 * Tests for FormComponent to ensure that labels are associated correctly with inputs.
 */
describe('FormComponent', () => {
    test('renders input fields with labels', () => {
        render(<FormComponent />);

        // Check if the input labels are correctly associated with their inputs
        const usernameLabel = screen.getByLabelText(/Username:/i);
        const emailLabel = screen.getByLabelText(/Email:/i);

        // Assert that the username input is in the document
        expect(usernameLabel).toBeInTheDocument();
        expect(emailLabel).toBeInTheDocument();
    });
});