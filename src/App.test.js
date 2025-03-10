import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

/**
 * Unit tests for the App component.
 */
describe('App Component', () => {
    test('renders UserManagement component on root path', () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByText(/User Management/i)).toBeInTheDocument();
    });

    test('renders HealthRecord component on /health-records path', () => {
        render(
            <MemoryRouter initialEntries={["/health-records"]}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByText(/Health Records/i)).toBeInTheDocument();
    });

    test('renders NotFound component for unknown paths', () => {
        render(
            <MemoryRouter initialEntries={["/unknown"]}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();
    });
});