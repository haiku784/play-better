import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RecordingButton from './RecordingButton';

describe('RecordingButton', () => {
    it('should display Record when not recording and Stop when recording', async () => {
        const mockStart = jest.fn();
        const mockStop = jest.fn();

        const { getByText } = render(<RecordingButton onStartRecording={mockStart} onStopRecording={mockStop} />);

        const button = getByText('Record');
        fireEvent.click(button);

        expect(mockStart).toHaveBeenCalled();
        expect(button.textContent).toBe('Stop');

        fireEvent.click(button);

        expect(mockStop).toHaveBeenCalled();
        expect(button.textContent).toBe('Record');
    });
});