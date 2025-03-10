import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SharingService from './SharingService';

/**
 * Integration tests for the SharingService component.
 */
describe('Integration tests for SharingService', () => {
    test('submits new sharing permission', async () => {
        render(<SharingService />);

        fireEvent.change(screen.getByPlaceholderText(/User ID to share with/i), { target: { value: '123' } });
        fireEvent.change(screen.getByPlaceholderText(/Record ID/i), { target: { value: '456' } });
        fireEvent.change(screen.getByRole('combobox'), { target: { value: 'view' } });

        fireEvent.click(screen.getByText(/Share Record/i));

        // Assuming the API call is mocked and returns a successful response
        const permissionItem = await screen.findByText(/Shared with User ID: 123, Record ID: 456, Type: view/i);
        expect(permissionItem).toBeInTheDocument();
    });
});