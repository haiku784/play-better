import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

/**
 * Unit tests for the App component.
 */
describe('App Component', () => {
    test('renders Users header', () => {
        render(<App />);
        const headerElement = screen.getByText(/Users/i);
        expect(headerElement).toBeInTheDocument();
    });

    test('renders Sessions header', () => {
        render(<App />);
        const headerElement = screen.getByText(/Sessions/i);
        expect(headerElement).toBeInTheDocument();
    });

    test('renders Notifications header', () => {
        render(<App />);
        const headerElement = screen.getByText(/Notifications/i);
        expect(headerElement).toBeInTheDocument();
    });

    test('renders Recommendations header', () => {
        render(<App />);
        const headerElement = screen.getByText(/Recommendations/i);
        expect(headerElement).toBeInTheDocument();
    });
});