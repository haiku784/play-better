import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import NotificationService from './NotificationService';

/**
 * Integration tests for NotificationService component.
 */
describe('NotificationService Integration', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('fetches and displays notifications', async () => {
        const mockNotifications = [
            { id: 1, message: 'New game available!', date: '2023-10-01T12:00:00Z' },
            { id: 2, message: 'Your session has been analyzed.', date: '2023-10-02T12:00:00Z' }
        ];
        fetch.mockImplementationOnce(() => Promise.resolve({ ok: true, json: () => Promise.resolve(mockNotifications) }));

        render(<NotificationService userId={1} />);

        await waitFor(() => {
            expect(screen.getByText(/New game available!/i)).toBeInTheDocument();
            expect(screen.getByText(/Your session has been analyzed./i)).toBeInTheDocument();
        });
    });

    test('handles fetch error', async () => {
        fetch.mockImplementationOnce(() => Promise.resolve({ ok: false }));

        render(<NotificationService userId={1} />);

        await waitFor(() => {
            expect(screen.getByText(/Error:/i)).toBeInTheDocument();
        });
    });
});
