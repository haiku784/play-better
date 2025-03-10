import React from 'react';
import { render, screen } from '@testing-library/react';
import UserManagement from './UserManagement';

/**
 * Integration tests for UserManagement component.
 */
describe('UserManagement Integration', () => {
    test('fetches and displays users', async () => {
        render(<UserManagement />);
        const userItem = await screen.findByText(/John Doe/i);
        expect(userItem).toBeInTheDocument();
    });
});