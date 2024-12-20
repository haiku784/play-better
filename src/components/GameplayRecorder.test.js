import { render, screen } from '@testing-library/react';
import GameplayRecorder from '../GameplayRecorder';

describe('GameplayRecorder', () => {
    test('renders start and stop buttons', () => {
        render(<GameplayRecorder />);
        const startButton = screen.getByRole('button', { name: /start recording/i });
        const stopButton = screen.getByRole('button', { name: /stop recording/i });
        expect(startButton).toBeInTheDocument();
        expect(stopButton).toBeInTheDocument();
    });
});