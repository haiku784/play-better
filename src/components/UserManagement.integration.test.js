import React from 'react';
import { render, screen } from '@testing-library/react';
import UserManagement from './UserManagement';

/**
 * Integration tests for UserManagement component.
 */
describe('UserManagement Integration Tests', () => {
    test('fetches and displays users', async () => {
        render(<UserManagement />);
        expect(await screen.findByText(/Users List/i)).toBeInTheDocument();
    });

    test('fetches and displays user preferences', async () => {
        render(<UserManagement />);
        expect(await screen.findByText(/User Preferences/i)).toBeInTheDocument();
    });
});