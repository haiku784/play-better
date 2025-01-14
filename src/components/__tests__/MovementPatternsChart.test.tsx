import React from 'react';
import { render } from '@testing-library/react';
import MovementPatternsChart from '../MovementPatternsChart';

describe('MovementPatternsChart', () => {
    it('renders correctly with given data', () => {
        const { container } = render(<MovementPatternsChart data={[50, 30, 20]} />);
        expect(container).toBeInTheDocument();
    });
});