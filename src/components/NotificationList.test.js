import React from 'react';
import { render, screen } from '@testing-library/react';
import NotificationList from './NotificationList';

/**
 * Unit test for NotificationList component.
 */
describe('NotificationList', () => {
    test('renders loading state', () => {
        render(<NotificationList userId={1} />);
        expect(screen.getByText(/Loading notifications.../i)).toBeInTheDocument();
    });

    test('renders error message', async () => {
        global.fetch = jest.fn(() => Promise.reject('API is down'));
        render(<NotificationList userId={1} />);
        expect(await screen.findByText(/Error: API is down/i)).toBeInTheDocument();
    });

    test('renders notifications', async () => {
        const mockNotifications = [
            { notificationId: '1', message: 'Test notification 1', timestamp: '2023-10-01T12:00:00Z' },
            { notificationId: '2', message: 'Test notification 2', timestamp: '2023-10-01T12:05:00Z' }
        ];

        global.fetch = jest.fn(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockNotifications)
        }));

        render(<NotificationList userId={1} />);
        expect(await screen.findByText(/Your Notifications/i)).toBeInTheDocument();
        expect(await screen.findByText(/Test notification 1/i)).toBeInTheDocument();
        expect(await screen.findByText(/Test notification 2/i)).toBeInTheDocument();
    });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NotificationList from './NotificationList';

/**
 * Unit tests for NotificationList component.
 */
describe('NotificationList', () => {
    test('renders loading state', () => {
        render(<NotificationList userId={1} />);
        expect(screen.getByText(/Loading notifications.../i)).toBeInTheDocument();
    });

    test('renders error message', async () => {
        global.fetch = jest.fn(() => Promise.reject('API is down'));
        render(<NotificationList userId={1} />);
        expect(await screen.findByText(/Error: API is down/i)).toBeInTheDocument();
    });

    test('renders notifications', async () => {
        const mockNotifications = [
            { notificationId: '1', message: 'Test notification 1', timestamp: '2023-10-01T12:00:00Z' },
            { notificationId: '2', message: 'Test notification 2', timestamp: '2023-10-01T12:05:00Z' }
        ];

        global.fetch = jest.fn(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockNotifications)
        }));

        render(<NotificationList userId={1} />);
        expect(await screen.findByText(/Your Notifications/i)).toBeInTheDocument();
        expect(await screen.findByText(/Test notification 1/i)).toBeInTheDocument();
        expect(await screen.findByText(/Test notification 2/i)).toBeInTheDocument();
    });
});