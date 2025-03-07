import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NotificationService from './NotificationService';

/**
 * Unit tests for NotificationService component.
 */
describe('NotificationService', () => {
  beforeEach(() => {
    // Mock fetch to return a sample notification
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ id: '1', message: 'Test notification' }]),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders notifications', async () => {
    render(<NotificationService />);
    const notificationElement = await screen.findByText(/Test notification/i);
    expect(notificationElement).toBeInTheDocument();
  });

  test('deletes a notification', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({ ok: true })
    );
    render(<NotificationService />);
    const deleteButton = await screen.findByText(/Delete/i);
    fireEvent.click(deleteButton);
    expect(screen.queryByText(/Test notification/i)).not.toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import NotificationService from './NotificationService';
import './global.css'; // Import global styles

/**
 * Unit tests for NotificationService component.
 */
describe('NotificationService', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ id: '1', message: 'Test notification' }]),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders notifications', async () => {
    render(<NotificationService />);
    const notificationElement = await screen.findByText(/Test notification/i);
    expect(notificationElement).toBeInTheDocument();
  });

  test('deletes a notification', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({ ok: true })
    );
    render(<NotificationService />);
    const deleteButton = await screen.findByText(/Delete/i);
    fireEvent.click(deleteButton);
    expect(screen.queryByText(/Test notification/i)).not.toBeInTheDocument();
  });
});