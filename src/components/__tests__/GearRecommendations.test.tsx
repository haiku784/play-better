import React from 'react';
import { render, screen } from '@testing-library/react';
import GearRecommendations from '../GearRecommendations';

const mockUserId = '123';
const mockData = [{ id: '1', name: 'Gear A', reason: 'Best for speed' }, { id: '2', name: 'Gear B', reason: 'Best for durability' }];

jest.mock('axios');
import axios from 'axios';

describe('GearRecommendations Component', () => {
    beforeAll(() => {
        (axios.get as jest.Mock).mockResolvedValue({ data: mockData });
    });

    it('renders gear recommendations', async () => {
        render(<GearRecommendations userId={mockUserId} />);
        const items = await screen.findAllByRole('listitem');
        expect(items).toHaveLength(mockData.length);
        expect(screen.getByText('Gear A - Best for speed')).toBeInTheDocument();
        expect(screen.getByText('Gear B - Best for durability')).toBeInTheDocument();
    });
});