import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import VideoAnnotation from './VideoAnnotation';

// VideoAnnotation Component Tests
describe('VideoAnnotation', () => {
    it('should add a comment at the current time', () => {
        const { getByPlaceholderText, getByText, getByText: getByTime } = render(<VideoAnnotation />);

        // Simulate time update
        const videoElement = getByText('Your browser does not support the video tag.').closest('video');
        fireEvent.timeUpdate(videoElement, { target: { currentTime: 5 } });

        // Add a comment
        fireEvent.change(getByPlaceholderText('Add a comment...'), { target: { value: 'Nice video!' } });
        fireEvent.click(getByText('Add Comment'));

        // Verify the comment was added
        expect(getByTime('[5.00s] Nice video!')).toBeInTheDocument();
    });
});