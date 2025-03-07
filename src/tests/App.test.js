// src/tests/App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

/**
 * Unit tests for App component to verify routing functionality.
 */
describe('App Component', () => {
    test('renders welcome message on home route', () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByText(/Welcome to the E-Sports Analysis System/i)).toBeInTheDocument();
    });

    test('renders UserService component on /users route', () => {
        render(
            <MemoryRouter initialEntries={["/users"]}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByText(/User Profiles/i)).toBeInTheDocument();
    });

    test('renders 404 message for unknown routes', () => {
        render(
            <MemoryRouter initialEntries={["/unknown"]}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();
    });
});