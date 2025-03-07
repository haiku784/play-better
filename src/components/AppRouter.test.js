import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRouter from './AppRouter';

/**
 * Unit tests for AppRouter component.
 */
describe('AppRouter Component', () => {
    test('renders UserManagement component on /users route', () => {
        render(
            <MemoryRouter initialEntries={["/users"]}>
                <AppRouter />
            </MemoryRouter>
        );
        expect(screen.getByText(/User Management/i)).toBeInTheDocument();
    });

    test('renders RecordingService component on /recording route', () => {
        render(
            <MemoryRouter initialEntries={["/recording"]}>
                <AppRouter />
            </MemoryRouter>
        );
        expect(screen.getByText(/Recording Service/i)).toBeInTheDocument();
    });

    test('renders Analysis component on /analysis/:sessionId route', () => {
        render(
            <MemoryRouter initialEntries={["/analysis/123"]}>
                <AppRouter />
            </MemoryRouter>
        );
        expect(screen.getByText(/Analysis Results for Session 123/i)).toBeInTheDocument();
    });

    test('renders Recommendation component on /recommendations/:userId route', () => {
        render(
            <MemoryRouter initialEntries={["/recommendations/1"]}>
                <AppRouter />
            </MemoryRouter>
        );
        expect(screen.getByText(/Game Recommendations/i)).toBeInTheDocument();
    });

    test('renders NotificationService component on /notifications/:userId route', () => {
        render(
            <MemoryRouter initialEntries={["/notifications/1"]}>
                <AppRouter />
            </MemoryRouter>
        );
        expect(screen.getByText(/User Notifications/i)).toBeInTheDocument();
    });
});