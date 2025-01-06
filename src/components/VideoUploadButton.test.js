import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import VideoUploadButton from './VideoUploadButton';

describe('VideoUploadButton', () => {
    test('renders upload button and handles file upload', async () => {
        render(<VideoUploadButton />);

        const fileInput = screen.getByLabelText(/upload video/i);
        const testFile = new File(['video content'], 'test.mp4', { type: 'video/mp4' });

        // Simulate file upload
        fireEvent.change(fileInput, { target: { files: [testFile] } });

        // Expect output to show success message (assuming a successful mock API call)
        expect(await screen.findByText(/upload successful/i)).toBeInTheDocument();
    });

    test('shows error message when upload fails', async () => {
        render(<VideoUploadButton />);

        const fileInput = screen.getByLabelText(/upload video/i);
        const testFile = new File(['video content'], 'test.mp4', { type: 'video/mp4' });

        // Simulate file upload
        fireEvent.change(fileInput, { target: { files: [testFile] } });

        // Expect output to show failure message when upload fails
        expect(await screen.findByText(/error:/i)).toBeInTheDocument();
    });
});