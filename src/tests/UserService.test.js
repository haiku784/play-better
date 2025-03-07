// src/tests/UserService.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import UserService from '../components/UserService';

/**
 * Mocking fetch to simulate API response for testing.
 */
global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
            { userId: 1, username: 'User1', email: 'user1@example.com', preferences: {} },
            { userId: 2, username: 'User2', email: 'user2@example.com', preferences: {} }
        ]),
    })
);

/**
 * Unit test for UserService component.
 */
describe('UserService Component', () => {
    test('renders user profiles', async () => {
        render(<UserService />);

        // Wait for the loading to finish and users to be displayed
        await waitFor(() => {
            expect(screen.getByText(/User Profiles/i)).toBeInTheDocument();
        });

        // Check if user names are rendered
        expect(screen.getByText(/User1/i)).toBeInTheDocument();
        expect(screen.getByText(/User2/i)).toBeInTheDocument();
    });

    test('handles error', async () => {
        fetch.mockImplementationOnce(() => Promise.reject(new Error('API is down')));
        render(<UserService />);

        await waitFor(() => {
            expect(screen.getByText(/Error: API is down/i)).toBeInTheDocument();
        });
    });
});