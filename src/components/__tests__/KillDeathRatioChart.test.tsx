import React from 'react';
import { render } from '@testing-library/react';
import KillDeathRatioChart from '../KillDeathRatioChart';

describe('KillDeathRatioChart', () => {
    it('renders correctly with given data', () => {
        const { container } = render(<KillDeathRatioChart data={[1, 2, 3]} />);
        expect(container).toBeInTheDocument();
    });
});