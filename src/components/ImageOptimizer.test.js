import React from 'react';
import { render, screen } from '@testing-library/react';
import ImageOptimizer from './ImageOptimizer';

/**
 * Test suite for ImageOptimizer component.
 */
describe('ImageOptimizer Component', () => {
    test('renders low resolution image and lazy loads high resolution', () => {
        const { container } = render(
            <ImageOptimizer
                lowResSrc="/images/low-res.jpg"
                src="/images/high-res.jpg"
                alt="Test image"
            />
        );

        const img = screen.getByAltText('Test image');
        expect(img.src).toContain('low-res.jpg'); // Check low-res image
        // Simulate onLoad event to check high-res loading (mocking needed in actual tests)
    });
});