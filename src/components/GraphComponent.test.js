import React from 'react';
import { render } from '@testing-library/react';
import GraphComponent from './GraphComponent';

/**
 * Unit tests for the GraphComponent to validate rendering and data handling.
 */
describe('GraphComponent', () => {
    it('renders correctly with given data', () => {
        const mockData = [1, 2, 3, 4];
        const { container } = render(<GraphComponent data={mockData} />);
        expect(container.querySelector('.graph-container')).toBeInTheDocument();
    });
});