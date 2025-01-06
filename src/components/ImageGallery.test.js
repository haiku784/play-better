import React from 'react';
import { render } from '@testing-library/react';
import ImageGallery from './ImageGallery';

test('renders ImageGallery and checks for alt text', () => {
  const { getByAltText } = render(<ImageGallery />);
  // Check if images with alt text are rendered
  expect(getByAltText('Description of image 1')).toBeInTheDocument();
  expect(getByAltText('Description of image 2')).toBeInTheDocument();
  // Check for image with missing alt text
  expect(() => getByAltText('')).toThrow(); // should throw error
  // Add more assertions as needed
});