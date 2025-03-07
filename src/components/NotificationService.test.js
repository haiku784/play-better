import React from 'react';
import { render, screen } from '@testing-library/react';
import NotificationService from './NotificationService';

/**
 * Unit tests for NotificationService component.
 */
describe('NotificationService', () => {
    test('renders loading state', () => {
        render(<NotificationService userId={1} />);
        expect(screen.getByText(/Loading notifications.../i)).toBeInTheDocument();
    });

    test('renders no notifications message', () => {
        render(<NotificationService userId={1} />);
        // Mock fetch to return an empty array
        global.fetch = jest.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve([]) }));
        expect(screen.getByText(/No notifications available./i)).toBeInTheDocument();
    });

    test('renders error message', async () => {
        render(<NotificationService userId={1} />);
        // Mock fetch to return an error
        global.fetch = jest.fn(() => Promise.resolve({ ok: false }));
        expect(await screen.findByText(/Error:/i)).toBeInTheDocument();
    });
});
