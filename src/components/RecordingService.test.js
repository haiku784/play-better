import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RecordingService from './RecordingService';

/**
 * Unit tests for the RecordingService component.
 */
describe('RecordingService Component', () => {
    test('renders RecordingService component', () => {
        render(<RecordingService />);
        expect(screen.getByText(/Recording Service/i)).toBeInTheDocument();
    });

    test('starts recording session', async () => {
        render(<RecordingService />);
        const input = screen.getByPlaceholderText(/Enter session title/i);
        fireEvent.change(input, { target: { value: 'Test Session' } });
        const button = screen.getByRole('button', { name: /Start Recording/i });
        fireEvent.click(button);
        expect(await screen.findByText(/Stop Recording/i)).toBeInTheDocument();
    });

    test('stops recording session', async () => {
        render(<RecordingService />);
        const input = screen.getByPlaceholderText(/Enter session title/i);
        fireEvent.change(input, { target: { value: 'Test Session' } });
        const startButton = screen.getByRole('button', { name: /Start Recording/i });
        fireEvent.click(startButton);
        const stopButton = await screen.findByRole('button', { name: /Stop Recording/i });
        fireEvent.click(stopButton);
        expect(await screen.findByText(/Start Recording/i)).toBeInTheDocument();
    });
});