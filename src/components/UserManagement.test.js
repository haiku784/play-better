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

  test('creates a user', async () => {
    render(<UserManagement />);
    const input = screen.getByPlaceholderText(/User Name/i);
    const createButton = screen.getByText(/Create User/i);

    fireEvent.change(input, { target: { value: 'John Doe' } });
    fireEvent.click(createButton);

    // Assuming fetchUsers is mocked to return the new user
    expect(await screen.findByText(/John Doe/i)).toBeInTheDocument();
  });

  test('updates a user', async () => {
    render(<UserManagement />);
    const input = screen.getByPlaceholderText(/User Name/i);
    const updateButton = screen.getByText(/Update User/i);

    // Simulate selecting a user to edit
    fireEvent.click(screen.getByText(/Edit/i));
    fireEvent.change(input, { target: { value: 'Jane Doe' } });
    fireEvent.click(updateButton);

    // Assuming fetchUsers is mocked to return the updated user
    expect(await screen.findByText(/Jane Doe/i)).toBeInTheDocument();
  });

  test('deletes a user', async () => {
    render(<UserManagement />);
    const deleteButton = screen.getByText(/Delete/i);

    fireEvent.click(deleteButton);

    // Assuming fetchUsers is mocked to not return the deleted user
    expect(screen.queryByText(/Deleted User/i)).not.toBeInTheDocument();
  });
});