// src/tests/UserProfile.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserProfile from '../components/UserProfile';

/**
 * Mock fetch function to simulate API calls.
 */
global.fetch = jest.fn();

describe('UserProfile Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders loading state initially', () => {
    fetch.mockImplementationOnce(() => Promise.resolve({ ok: true, json: () => Promise.resolve({}) }));
    render(<UserProfile />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('displays user profile data', async () => {
    fetch.mockImplementationOnce(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ name: 'John Doe', email: 'john@example.com' }) }));
    render(<UserProfile />);
    await waitFor(() => expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument());
    expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument();
  });

  test('handles update user profile', async () => {
    fetch.mockImplementationOnce(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ name: 'John Doe', email: 'john@example.com' }) }));
    render(<UserProfile />);
    await waitFor(() => expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument());

    fetch.mockImplementationOnce(() => Promise.resolve({ ok: true }));
    fireEvent.change(screen.getByLabelText(/Name:/i), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'jane@example.com' } });
    fireEvent.click(screen.getByText(/Update Profile/i));

    await waitFor(() => expect(fetch).toHaveBeenCalledWith('/users/profile', expect.objectContaining({
      method: 'PUT',
      body: JSON.stringify({ name: 'Jane Doe', email: 'jane@example.com' })
    })));
  });

  test('displays error message on fetch failure', async () => {
    fetch.mockImplementationOnce(() => Promise.reject(new Error('Fetch failed')));
    render(<UserProfile />);
    await waitFor(() => expect(screen.getByText(/Fetch failed/i)).toBeInTheDocument());
  });
});

// src/tests/UserProfile.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import UserProfile from '../components/UserProfile';

/**
 * Unit tests for UserProfile component.
 */
describe('UserProfile Component', () => {
  test('renders loading state', () => {
    render(<UserProfile />);
    const loadingElement = screen.getByText(/loading/i);
    expect(loadingElement).toBeInTheDocument();
  });

  test('renders user profile when data is fetched', async () => {
    render(<UserProfile />);
    const profileElement = await screen.findByText(/name/i);
    expect(profileElement).toBeInTheDocument();
  });
});