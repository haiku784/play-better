import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserManagement from './UserManagement';

/**
 * Unit tests for UserManagement component.
 */
describe('UserManagement Component', () => {
    test('renders UserManagement component', () => {
        render(<UserManagement />);
        expect(screen.getByText(/User Management/i)).toBeInTheDocument();
    });

    test('registers a new user', async () => {
        render(<UserManagement />);
        fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password123' } });
        fireEvent.click(screen.getByText(/Register/i));
        expect(await screen.findByText(/User registered/i)).toBeInTheDocument();
    });

    test('updates user preferences', async () => {
        render(<UserManagement />);
        fireEvent.change(screen.getByRole('textbox'), { target: { value: JSON.stringify({ theme: 'dark' }) } });
        fireEvent.click(screen.getByText(/Update Preferences/i));
        expect(await screen.findByText(/Preferences updated successfully/i)).toBeInTheDocument();
    });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UserManagement from './UserManagement';

/**
 * Unit tests for UserManagement component.
 */
describe('UserManagement Component', () => {
    test('renders UserManagement component', () => {
        render(<UserManagement />);
        expect(screen.getByText(/User Management/i)).toBeInTheDocument();
    });

    test('registers a new user', async () => {
        render(<UserManagement />);
        fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password123' } });
        fireEvent.click(screen.getByText(/Register/i));
        expect(await screen.findByText(/User registered/i)).toBeInTheDocument();
    });

    test('updates user preferences', async () => {
        render(<UserManagement />);
        fireEvent.change(screen.getByRole('textbox'), { target: { value: JSON.stringify({ theme: 'dark' }) } });
        fireEvent.click(screen.getByText(/Update Preferences/i));
        expect(await screen.findByText(/Preferences updated successfully/i)).toBeInTheDocument();
    });
});