import React from 'react';
import { render, screen } from '@testing-library/react';
import UserManagement from './UserManagement';

/**
 * Integration tests for UserManagement component.
 */
describe('UserManagement Integration', () => {
  test('fetches and displays users', async () => {
    render(<UserManagement />);

    // Assuming fetchUsers is mocked to return a list of users
    expect(await screen.findByText(/John Doe/i)).toBeInTheDocument();
    expect(await screen.findByText(/Jane Smith/i)).toBeInTheDocument();
  });

  test('creates, updates, and deletes users', async () => {
    render(<UserManagement />);

    // Create a user
    fireEvent.change(screen.getByPlaceholderText(/User Name/i), { target: { value: 'New User' } });
    fireEvent.click(screen.getByText(/Create User/i));
    expect(await screen.findByText(/New User/i)).toBeInTheDocument();

    // Update the user
    fireEvent.click(screen.getByText(/Edit/i));
    fireEvent.change(screen.getByPlaceholderText(/User Name/i), { target: { value: 'Updated User' } });
    fireEvent.click(screen.getByText(/Update User/i));
    expect(await screen.findByText(/Updated User/i)).toBeInTheDocument();

    // Delete the user
    fireEvent.click(screen.getByText(/Delete/i));
    expect(screen.queryByText(/Updated User/i)).not.toBeInTheDocument();
  });
});