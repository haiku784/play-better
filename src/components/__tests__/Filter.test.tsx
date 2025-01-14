import React from 'react';
import { render, screen } from '@testing-library/react';
import Filter from '../Filter';

describe('Filter Component', () => {
    it('renders filter options correctly', () => {
        render(<Filter onChange={() => {}} />);
        expect(screen.getByLabelText(/Filter by KPI:/)).toBeInTheDocument();
    });
});