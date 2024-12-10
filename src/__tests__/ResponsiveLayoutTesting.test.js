// This file contains a utility function for testing the responsiveness of the layout
// on both iOS and Android devices using React Testing Library and jest

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App'; // Assuming App is the main component to be tested

// Helper function to check if elements are rendered correctly
function checkResponsiveElements() {
    // Check for key components that should be present on both mobile devices
    const headerElement = screen.getByText(/welcome/i);
    const footerElement = screen.getByText(/footer content/i);
    expect(headerElement).toBeInTheDocument();
    expect(footerElement).toBeInTheDocument();
}

describe('Responsive Layout Tests', () => {
    test('renders correctly on iOS devices', () => {
        // Simulate iOS device viewport
        window.innerWidth = 375; // iPhone width
        window.dispatchEvent(new Event('resize'));
        render(<App />);
        checkResponsiveElements();
    });

    test('renders correctly on Android devices', () => {
        // Simulate Android device viewport
        window.innerWidth = 360; // Typical Android width
        window.dispatchEvent(new Event('resize'));
        render(<App />);
        checkResponsiveElements();
    });
});