import React from 'react';
import { render, screen } from '@testing-library/react';
import TableComponent from './TableComponent';

/**
 * Unit tests for TableComponent to validate rendering of metrics correctly.
 */
describe('TableComponent', () => {
    it('renders a table with the correct headers', () => {
        const mockData = [{ name: 'Metric 1', value: 100 }];
        render(<TableComponent data={mockData} />);
        expect(screen.getByText('Metric')).toBeInTheDocument();
        expect(screen.getByText('Value')).toBeInTheDocument();
    });

    it('renders metric rows correctly', () => {
        const mockData = [{ name: 'Metric 1', value: 100 }];
        render(<TableComponent data={mockData} />);
        expect(screen.getByText('Metric 1')).toBeInTheDocument();
        expect(screen.getByText('100')).toBeInTheDocument();
    });
});