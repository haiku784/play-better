import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

/**
 * Global tests for the App component.
 */
describe('App Global Tests', () => {
    test('renders global styles', () => {
        render(<App />);
        const body = document.body;
        expect(body).toHaveStyle('font-family: Arial, sans-serif');
        expect(body).toHaveStyle('background-color: #f0f0f0');
    });
});