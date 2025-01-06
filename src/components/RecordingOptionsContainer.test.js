import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RecordingOptionsContainer from './RecordingOptionsContainer';

// Test for RecordingOptionsContainer component
describe('RecordingOptionsContainer', () => {
    test('renders resolution and frame rate selectors', () => {
        render(<RecordingOptionsContainer />);
        expect(screen.getByLabelText(/select resolution/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/select frame rate/i)).toBeInTheDocument();
    });

    test('changes resolution and frame rate', () => {
        render(<RecordingOptionsContainer />);

        const resolutionSelect = screen.getByLabelText(/select resolution/i);
        fireEvent.change(resolutionSelect, { target: { value: '1080p' } });
        expect(resolutionSelect.value).toBe('1080p');

        const frameRateSelect = screen.getByLabelText(/select frame rate/i);
        fireEvent.change(frameRateSelect, { target: { value: '60' } });
        expect(frameRateSelect.value).toBe('60');
    });
});