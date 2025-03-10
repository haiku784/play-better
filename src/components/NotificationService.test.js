import React from 'react';
import { render, screen } from '@testing-library/react';
import NotificationService from './NotificationService';

/**
 * Unit tests for NotificationService component.
 */
describe('NotificationService', () => {
    test('renders notification header', () => {
        render(<NotificationService />);
        const headerElement = screen.getByText(/User Notifications/i);
        expect(headerElement).toBeInTheDocument();
    });

    test('renders no notifications message when no notifications are available', () => {
        render(<NotificationService />);
        const noNotificationsElement = screen.getByText(/No notifications available/i);
        expect(noNotificationsElement).toBeInTheDocument();
    });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import NotificationService from './NotificationService';

/**
 * Unit tests for NotificationService component.
 */
describe('NotificationService', () => {
    test('renders notification header', () => {
        render(<NotificationService />);
        const headerElement = screen.getByText(/User Notifications/i);
        expect(headerElement).toBeInTheDocument();
    });

    test('renders no notifications message when no notifications are available', () => {
        render(<NotificationService />);
        const noNotificationsElement = screen.getByText(/No notifications available/i);
        expect(noNotificationsElement).toBeInTheDocument();
    });
});