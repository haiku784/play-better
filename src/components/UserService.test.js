import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserService from './UserService';

/**
 * Mock fetch function for testing.
 */
global.fetch = jest.fn();

describe('UserService Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders loading state', () => {
    fetch.mockImplementationOnce(() => Promise.resolve({ ok: true, json: () => Promise.resolve([]) }));
    render(<UserService />);
    expect(screen.getByText(/Loading users.../i)).toBeInTheDocument();
  });

  test('renders user list', async () => {
    fetch.mockImplementationOnce(() => Promise.resolve({ ok: true, json: () => Promise.resolve([{ userId: '1', username: 'User1' }]) }));
    render(<UserService />);
    expect(await screen.findByText(/User1/i)).toBeInTheDocument();
  });

  test('handles error state', async () => {
    fetch.mockImplementationOnce(() => Promise.reject(new Error('Failed to fetch users')));
    render(<UserService />);
    expect(await screen.findByText(/Error: Failed to fetch users/i)).toBeInTheDocument();
  });

  test('adds a user', async () => {
    fetch.mockImplementationOnce(() => Promise.resolve({ ok: true, json: () => Promise.resolve([{ userId: '1', username: 'User1' }]) }));
    render(<UserService />);
    fireEvent.click(screen.getByText(/Add User/i));
    expect(fetch).toHaveBeenCalledWith('/users/', expect.objectContaining({ method: 'POST' }));
  });

  test('deletes a user', async () => {
    fetch.mockImplementationOnce(() => Promise.resolve({ ok: true, json: () => Promise.resolve([{ userId: '1', username: 'User1' }]) }));
    render(<UserService />);
    fireEvent.click(screen.getByText(/Delete/i));
    expect(fetch).toHaveBeenCalledWith('/users/1/', { method: 'DELETE' });
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import UserService from './UserService';
import './global.css'; // Import global styles

/**
 * Unit tests for UserService component.
 */
describe('UserService Component', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ userId: '1', username: 'User1' }]),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state', () => {
    render(<UserService />);
    expect(screen.getByText(/Loading users.../i)).toBeInTheDocument();
  });

  test('renders user list', async () => {
    render(<UserService />);
    expect(await screen.findByText(/User1/i)).toBeInTheDocument();
  });

  test('handles error state', async () => {
    global.fetch.mockImplementationOnce(() => Promise.reject(new Error('Failed to fetch users')));
    render(<UserService />);
    expect(await screen.findByText(/Error: Failed to fetch users/i)).toBeInTheDocument();
  });

  test('adds a user', async () => {
    render(<UserService />);
    fireEvent.click(screen.getByText(/Add User/i));
    expect(fetch).toHaveBeenCalledWith('/users/', expect.objectContaining({ method: 'POST' }));
  });

  test('deletes a user', async () => {
    render(<UserService />);
    fireEvent.click(screen.getByText(/Delete/i));
    expect(fetch).toHaveBeenCalledWith('/users/1/', { method: 'DELETE' });
  });
});