import React from 'react';
import { render } from '@testing-library/react';
import AccessibleText from './AccessibleText';
import ImageWithAltText from './ImageWithAltText';

/**
 * Test suite for accessibility components.
 */
describe('Accessibility Components', () => {
    test('AccessibleText renders correctly', () => {
        const { getByText } = render(<AccessibleText text="Hello, World!" />);
        expect(getByText('Hello, World!')).toBeInTheDocument();
    });

    test('ImageWithAltText renders with alt text', () => {
        const { getByAltText } = render(<ImageWithAltText src="image.png" alt="Descriptive text" />);
        expect(getByAltText('Descriptive text')).toBeInTheDocument();
    });
});
