// src/tests/NotificationList.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import NotificationList from '../components/NotificationList';

/**
 * Mocking the fetch API to simulate API responses.
 */
global.fetch = jest.fn();

describe('NotificationList', () => {
    const userId = 1;

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders loading state initially', () => {
        fetch.mockImplementationOnce(() => Promise.resolve({ ok: true, json: () => Promise.resolve([]) }));
        render(<NotificationList userId={userId} />);
        expect(screen.getByText(/Loading notifications.../i)).toBeInTheDocument();
    });

    test('renders notifications after fetching', async () => {
        const mockNotifications = [
            { notificationId: 1, message: 'New analysis available!', timestamp: '2023-10-01T12:00:00Z' },
            { notificationId: 2, message: 'Your recording has been saved.', timestamp: '2023-10-01T12:05:00Z' }
        ];
        fetch.mockImplementationOnce(() => Promise.resolve({ ok: true, json: () => Promise.resolve(mockNotifications) }));
        render(<NotificationList userId={userId} />);
        await waitFor(() => expect(screen.getByText(/New analysis available!/i)).toBeInTheDocument());
        expect(screen.getByText(/Your recording has been saved./i)).toBeInTheDocument();
    });

    test('renders error message on fetch failure', async () => {
        fetch.mockImplementationOnce(() => Promise.reject(new Error('Fetch failed')));
        render(<NotificationList userId={userId} />);
        await waitFor(() => expect(screen.getByText(/Error: Fetch failed/i)).toBeInTheDocument());
    });
});