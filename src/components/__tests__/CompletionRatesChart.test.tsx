import React from 'react';
import { render } from '@testing-library/react';
import CompletionRatesChart from '../CompletionRatesChart';

describe('CompletionRatesChart', () => {
    it('renders correctly with given data', () => {
        const { container } = render(<CompletionRatesChart data={[80, 90, 100]} />);
        expect(container).toBeInTheDocument();
    });
});