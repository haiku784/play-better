import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GearSelectionComponent from '../GearSelectionComponent';

jest.mock('axios');
import axios from 'axios';

const mockGearOptions = [{ id: '1', name: 'Gear A', description: 'Description A' }, { id: '2', name: 'Gear B', description: 'Description B' }];

describe('GearSelectionComponent', () => {
    beforeAll(() => {
        (axios.get as jest.Mock).mockResolvedValue({ data: mockGearOptions });
    });

    it('renders gear options and allows selection', async () => {
        render(<GearSelectionComponent />);
        const checkboxA = await screen.findByLabelText('Gear A - Description A');
        const checkboxB = await screen.findByLabelText('Gear B - Description B');
        fireEvent.click(checkboxA);
        expect(checkboxA).toBeChecked();
        fireEvent.click(checkboxB);
        expect(checkboxB).toBeChecked();
        fireEvent.click(checkboxA);
        expect(checkboxA).not.toBeChecked();
    });
});