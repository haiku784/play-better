import React from 'react';
import { render, screen } from '@testing-library/react';
import NotificationService from './NotificationService';

/**
 * Integration tests for NotificationService component.
 */
describe('NotificationService Integration', () => {
    test('fetches and displays notifications', async () => {
        // Mock the fetch API response
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve([
                    { id: 1, message: 'Test notification 1', timestamp: new Date() },
                    { id: 2, message: 'Test notification 2', timestamp: new Date() }
                ]),
            })
        );

        render(<NotificationService />);

        // Wait for notifications to be displayed
        const notification1 = await screen.findByText(/Test notification 1/i);
        const notification2 = await screen.findByText(/Test notification 2/i);

        expect(notification1).toBeInTheDocument();
        expect(notification2).toBeInTheDocument();
    });
});