import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserManagement from './UserManagement';

/**
 * Unit tests for UserManagement component.
 */
describe('UserManagement Component', () => {
    test('renders UserManagement component', () => {
        render(<UserManagement />);
        const headingElement = screen.getByText(/User Management/i);
        expect(headingElement).toBeInTheDocument();
    });

    test('creates a new user', async () => {
        render(<UserManagement />);
        const nameInput = screen.getByPlaceholderText(/Name/i);
        const emailInput = screen.getByPlaceholderText(/Email/i);
        const roleInput = screen.getByPlaceholderText(/Role/i);
        const buttonElement = screen.getByText(/Create User/i);

        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
        fireEvent.change(roleInput, { target: { value: 'Patient' } });
        fireEvent.click(buttonElement);

        // Add assertions to check if the user was created successfully
    });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import UserManagement from './UserManagement';

/**
 * Unit tests for UserManagement component.
 */
describe('UserManagement Component', () => {
    test('renders UserManagement component', () => {
        render(<UserManagement />);
        const headingElement = screen.getByText(/User Management/i);
        expect(headingElement).toBeInTheDocument();
    });

    test('creates a new user', async () => {
        render(<UserManagement />);
        const nameInput = screen.getByPlaceholderText(/Name/i);
        const emailInput = screen.getByPlaceholderText(/Email/i);
        const roleInput = screen.getByPlaceholderText(/Role/i);
        const buttonElement = screen.getByText(/Create User/i);

        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
        fireEvent.change(roleInput, { target: { value: 'Patient' } });
        fireEvent.click(buttonElement);

        // Add assertions to check if the user was created successfully
    });
});