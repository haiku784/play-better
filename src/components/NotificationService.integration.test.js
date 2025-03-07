import React from 'react';
import { render, screen } from '@testing-library/react';
import NotificationService from './NotificationService';

/**
 * Integration tests for NotificationService component.
 */
describe('NotificationService Integration', () => {
  test('fetches and displays notifications', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ id: '1', message: 'Test notification' }]),
      })
    );

    render(<NotificationService />);
    const notificationElement = await screen.findByText(/Test notification/i);
    expect(notificationElement).toBeInTheDocument();
  });

  test('handles fetch error gracefully', async () => {
    global.fetch = jest.fn(() => Promise.reject('API is down'));
    render(<NotificationService />);
    const errorMessage = await screen.findByText(/No notifications available./i);
    expect(errorMessage).toBeInTheDocument();
  });
});