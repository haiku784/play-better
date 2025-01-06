import React from 'react';
import { render } from '@testing-library/react';
import ResponsiveText from './ResponsiveText';

describe('ResponsiveText Component', () => {
    test('renders correctly with children', () => {
        const { getByText } = render(<ResponsiveText>Hello World</ResponsiveText>);
        expect(getByText('Hello World')).toBeInTheDocument();
    });
});