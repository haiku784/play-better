import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import StartRecordingComponent from './StartRecordingComponent';

// Mocking the fetch API to simulate server response
global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({ status: 'success', recording_id: '12345' })
}));

describe('StartRecordingComponent', () => {
    test('renders the StartRecordingComponent', () => {
        render(<StartRecordingComponent />);
        expect(screen.getByText(/Start Recording/i)).toBeInTheDocument();
    });

    test('initiates recording successfully', async () => {
        render(<StartRecordingComponent />);
        fireEvent.change(screen.getByLabelText(/Game Title/i), { target: { value: 'My Cool Game' }});
        fireEvent.change(screen.getByLabelText(/User ID/i), { target: { value: 'user123' }});
        fireEvent.change(screen.getByLabelText(/Recording Quality/i), { target: { value: '1080p' }});
        fireEvent.click(screen.getByRole('button', { name: /Start Recording/i }));

        const statusMessage = await screen.findByText(/Recording started successfully/i);
        expect(statusMessage).toBeInTheDocument();
        expect(screen.getByText(/Recording ID: 12345/i)).toBeInTheDocument();
    });
});