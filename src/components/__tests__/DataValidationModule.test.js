import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DataValidationModule from '../components/DataValidationModule';

test('validates correct data input', () => {
    const mockCallback = jest.fn();
    const { getByPlaceholderText, getByText } = render(<DataValidationModule onValidationComplete={mockCallback} />);

    fireEvent.change(getByPlaceholderText('Enter raw match data in JSON format'), {
        target: { value: '{ "field": "value" }' }
    });
    fireEvent.click(getByText('Validate Data'));

    expect(mockCallback).toHaveBeenCalledWith({ isValid: true, errors: [] });
});

test('invalidates incorrect data input', () => {
    const mockCallback = jest.fn();
    const { getByPlaceholderText, getByText } = render(<DataValidationModule onValidationComplete={mockCallback} />);

    fireEvent.change(getByPlaceholderText('Enter raw match data in JSON format'), {
        target: { value: 'invalid data' }
    });
    fireEvent.click(getByText('Validate Data'));

    expect(mockCallback).toHaveBeenCalledWith({ isValid: false, errors: ['Data must be a valid object.'] });
});
