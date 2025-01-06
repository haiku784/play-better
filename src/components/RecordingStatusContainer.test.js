import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RecordingStatusContainer from './RecordingStatusContainer';

test('displays recording status correctly', () => {
    const { getByText } = render(<RecordingStatusContainer />);

    // Initially, the status should indicate recording stopped
    expect(getByText(/recording stopped/i)).toBeInTheDocument();

    // Simulate starting recording
    fireEvent.click(getByText(/start recording/i));
    expect(getByText(/recording in progress/i)).toBeInTheDocument();

    // Simulate stopping recording
    fireEvent.click(getByText(/stop recording/i));
    expect(getByText(/recording stopped/i)).toBeInTheDocument();
});
