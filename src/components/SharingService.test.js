import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SharingService from './SharingService';

/**
 * Unit tests for the SharingService component.
 */
describe('SharingService Component', () => {
    test('renders SharingService component', () => {
        render(<SharingService />);
        const headingElement = screen.getByText(/Sharing Health Records/i);
        expect(headingElement).toBeInTheDocument();
    });

    test('allows user to input sharing details', () => {
        render(<SharingService />);
        const userInput = screen.getByPlaceholderText(/User ID to share with/i);
        const recordInput = screen.getByPlaceholderText(/Record ID/i);
        const permissionSelect = screen.getByRole('combobox');

        fireEvent.change(userInput, { target: { value: '123' } });
        fireEvent.change(recordInput, { target: { value: '456' } });
        fireEvent.change(permissionSelect, { target: { value: 'view' } });

        expect(userInput.value).toBe('123');
        expect(recordInput.value).toBe('456');
        expect(permissionSelect.value).toBe('view');
    });
});