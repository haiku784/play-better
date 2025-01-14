import { render, screen, fireEvent } from '@testing-library/react';
import RecordingButton from '../RecordingButton';

describe('RecordingButton', () => {
    test('renders start recording button', () => {
        render(<RecordingButton />);
        expect(screen.getByRole('button')).toHaveTextContent('Start Recording');
    });

    test('toggles button text when clicked', () => {
        render(<RecordingButton />);
        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(button).toHaveTextContent('Stop Recording');
        fireEvent.click(button);
        expect(button).toHaveTextContent('Start Recording');
    });
});