// src/tests/global.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App'; // Assuming App is the main component that includes global styles

/**
 * Global styles test to ensure styles are applied correctly.
 */
describe('Global Styles', () => {
    test('renders main app with global styles', () => {
        render(<App />);
        const title = screen.getByText(/User Profiles/i);
        expect(title).toBeInTheDocument();
        expect(title).toHaveStyle('color: #4CAF50');
    });
});