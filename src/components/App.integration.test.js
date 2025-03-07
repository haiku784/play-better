import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

/**
 * Integration tests for the App component.
 */
describe('App Integration Tests', () => {
    test('fetches and displays users', async () => {
        render(<App />);
        const userElement = await screen.findByText(/User1/i);
        expect(userElement).toBeInTheDocument();
    });

    test('fetches and displays sessions', async () => {
        render(<App />);
        const sessionElement = await screen.findByText(/Session1/i);
        expect(sessionElement).toBeInTheDocument();
    });

    test('fetches and displays notifications', async () => {
        render(<App />);
        const notificationElement = await screen.findByText(/Notification1/i);
        expect(notificationElement).toBeInTheDocument();
    });

    test('fetches and displays recommendations', async () => {
        render(<App />);
        const recommendationElement = await screen.findByText(/Recommendation1/i);
        expect(recommendationElement).toBeInTheDocument();
    });
});