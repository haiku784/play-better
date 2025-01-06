import React from 'react';
import { render } from '@testing-library/react';
import ResponsiveGridLayout from './ResponsiveGridLayout';

describe('ResponsiveGridLayout', () => {
    test('renders grid layout correctly', () => {
        const { getByText } = render(<ResponsiveGridLayout />);
        expect(getByText(/Item 1/i)).toBeInTheDocument();
        expect(getByText(/Item 2/i)).toBeInTheDocument();
        expect(getByText(/Item 3/i)).toBeInTheDocument();
        expect(getByText(/Item 4/i)).toBeInTheDocument();
    });
});