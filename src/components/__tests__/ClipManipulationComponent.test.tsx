import { render, screen, fireEvent } from '@testing-library/react';
import ClipManipulationComponent from '../ClipManipulationComponent';

describe('ClipManipulationComponent', () => {
    test('trims clip and shows success notification', async () => {
        const mockOnSuccess = jest.fn();
        const mockOnError = jest.fn();

        render(<ClipManipulationComponent onSuccess={mockOnSuccess} onError={mockOnError} />);

        fireEvent.change(screen.getByPlaceholderText('Start Time'), { target: { value: 10 } });
        fireEvent.change(screen.getByPlaceholderText('End Time'), { target: { value: 20 } });
        fireEvent.click(screen.getByText('Trim Clip'));

        expect(mockOnSuccess).toHaveBeenCalledWith('Clip trimmed successfully!');
    });

    test('shows error notification for failed trim', async () => {
        const mockOnSuccess = jest.fn();
        const mockOnError = jest.fn();

        global.fetch = jest.fn(() => Promise.reject(new Error('Failed to trim clip')));

        render(<ClipManipulationComponent onSuccess={mockOnSuccess} onError={mockOnError} />);
        fireEvent.click(screen.getByText('Trim Clip'));

        expect(mockOnError).toHaveBeenCalledWith('Error trimming clip. Please try again.');
    });
});