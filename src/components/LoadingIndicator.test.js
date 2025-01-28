import React from 'react';
import { render } from '@testing-library/react';
import LoadingIndicator from './LoadingIndicator';

describe('LoadingIndicator', () => {
    it('renders loading indicator', () => {
        const { getByText } = render(<LoadingIndicator />);
        expect(getByText('Loading...')).toBeInTheDocument();
    });
});