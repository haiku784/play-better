import React from 'react';
import { render, screen } from '@testing-library/react';
import LazyLoadedComponent from './LazyLoadedComponent';

/**
 * Test suite for LazyLoadedComponent.
 */
describe('LazyLoadedComponent', () => {
    test('renders without crashing', () => {
        render(<LazyLoadedComponent />);
        expect(screen.getByText(/Image Gallery/i)).toBeInTheDocument();
    });
});