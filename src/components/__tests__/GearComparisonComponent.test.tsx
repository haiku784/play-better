import React from 'react';
import { render, screen } from '@testing-library/react';
import GearComparisonComponent from '../GearComparisonComponent';

const mockComparisons = [{ id: '1', name: 'Gear A', comparisonDetails: 'Detail A' }, { id: '2', name: 'Gear B', comparisonDetails: 'Detail B' }];

jest.mock('axios');
import axios from 'axios';

describe('GearComparisonComponent', () => {
    beforeAll(() => {
        (axios.post as jest.Mock).mockResolvedValue({ data: mockComparisons });
    });

    it('renders gear comparison table', async () => {
        render(<GearComparisonComponent gearIds={['1', '2']} />);
        const rows = await screen.findAllByRole('row');
        expect(rows).toHaveLength(mockComparisons.length + 1); // +1 for header row
        expect(screen.getByText('Gear A')).toBeInTheDocument();
        expect(screen.getByText('Detail A')).toBeInTheDocument();
    });
});