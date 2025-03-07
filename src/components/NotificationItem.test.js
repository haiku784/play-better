import React from 'react';
import { render, screen } from '@testing-library/react';
import NotificationItem from './NotificationItem';

/**
 * Unit test for NotificationItem component.
 */
describe('NotificationItem', () => {
    test('renders notification message and timestamp', () => {
        const notification = {
            notificationId: '1',
            message: 'Test notification',
            timestamp: '2023-10-01T12:00:00Z'
        };

        render(<NotificationItem notification={notification} />);
        expect(screen.getByText(/Test notification/i)).toBeInTheDocument();
        expect(screen.getByText(/10"/1\/2023, 12:00:00 PM/i)).toBeInTheDocument();
    });
});