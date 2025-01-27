import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import DataValidationModule from './DataValidationModule';

/**
 * Unit tests for the DataValidationModule component.
 */
describe('DataValidationModule', () => {
    test('validates data correctly', () => {
        render(<DataValidationModule />);
        fireEvent.change(screen.getByPlaceholderText('Enter match data in JSON format'), {
            target: { value: '{"key": "value"}' },
        });
        fireEvent.click(screen.getByText('Validate Data'));
        expect(screen.getByText('Data is valid!')).toBeInTheDocument();
    });

    test('shows error for empty data', () => {
        render(<DataValidationModule />);
        fireEvent.change(screen.getByPlaceholderText('Enter match data in JSON format'), {
            target: { value: '{}' },
        });
        fireEvent.click(screen.getByText('Validate Data'));
        expect(screen.getByText('Data cannot be empty.')).toBeInTheDocument();
    });
});