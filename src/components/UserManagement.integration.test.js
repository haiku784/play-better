import React from 'react';
import { render, screen } from '@testing-library/react';
import UserManagement from './UserManagement';

/**
 * Integration tests for UserManagement component.
 */
describe('UserManagement Integration Tests', () => {
    test('fetches and displays users', async () => {
        // Mocking fetch to return a sample user list
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([{ id: 1, name: 'John Doe', email: 'john@example.com' }]),
            })
        );
        render(<UserManagement />);
        expect(await screen.findByText(/John Doe/i)).toBeInTheDocument();
    });
});