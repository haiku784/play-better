import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NotificationService from './NotificationService';

/**
 * Mock fetch function to simulate API calls.
 */
global.fetch = jest.fn();

describe('NotificationService', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders notifications', async () => {
    // Mock the fetch response
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce([
        { id: 1, message: 'New message from admin' },
        { id: 2, message: 'Your recording is ready' }
      ])
    });

    render(<NotificationService />);

    // Wait for notifications to be displayed
    const notification1 = await screen.findByText('New message from admin');
    const notification2 = await screen.findByText('Your recording is ready');

    expect(notification1).toBeInTheDocument();
    expect(notification2).toBeInTheDocument();
  });

  test('marks notification as read', async () => {
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce([
        { id: 1, message: 'New message from admin' }
      ])
    });

    render(<NotificationService />);

    // Wait for the notification to be displayed
    const notification = await screen.findByText('New message from admin');
    const button = screen.getByText('Mark as Read');

    // Simulate button click
    fireEvent.click(button);

    // Check if the notification is removed from the document
    expect(notification).not.toBeInTheDocument();
  });
});