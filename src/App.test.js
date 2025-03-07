import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

/**
 * Unit tests for the App component to ensure routing works correctly.
 */
describe('App Component', () => {
    test('renders RecordingService component on /recording route', () => {
        const { getByText } = render(
            <MemoryRouter initialEntries={["/recording"]}>
                <App />
            </MemoryRouter>
        );
        expect(getByText(/Recording Service/i)).toBeInTheDocument();
    });

    test('renders Analysis component on /analysis route', () => {
        const { getByText } = render(
            <MemoryRouter initialEntries={["/analysis"]}>
                <App />
            </MemoryRouter>
        );
        expect(getByText(/Performance Analysis/i)).toBeInTheDocument();
    });

    test('renders RecommendationComponent on /recommendations route', () => {
        const { getByText } = render(
            <MemoryRouter initialEntries={["/recommendations"]}>
                <App />
            </MemoryRouter>
        );
        expect(getByText(/Recommendations/i)).toBeInTheDocument();
    });

    test('renders UserManagement on /user-management route', () => {
        const { getByText } = render(
            <MemoryRouter initialEntries={["/user-management"]}>
                <App />
            </MemoryRouter>
        );
        expect(getByText(/User Management/i)).toBeInTheDocument();
    });

    test('renders NotificationList on /notifications route', () => {
        const { getByText } = render(
            <MemoryRouter initialEntries={["/notifications"]}>
                <App />
            </MemoryRouter>
        );
        expect(getByText(/Your Notifications/i)).toBeInTheDocument();
    });

    test('renders NotFound component for unknown routes', () => {
        const { getByText } = render(
            <MemoryRouter initialEntries={["/unknown"]}>
                <App />
            </MemoryRouter>
        );
        expect(getByText(/404 Not Found/i)).toBeInTheDocument();
    });
});