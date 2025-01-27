import { render, screen, fireEvent } from '@testing-library/react';
import VideoConversionModule from './VideoConversionModule';

describe('VideoConversionModule', () => {
    test('renders input fields and button', () => {
        render(<VideoConversionModule />);
        expect(screen.getByPlaceholderText('Enter desired format')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Convert Video/i })).toBeInTheDocument();
    });

    test('displays error message when fields are empty', () => {
        render(<VideoConversionModule />);
        fireEvent.click(screen.getByRole('button', { name: /Convert Video/i }));
        expect(screen.getByText(/Please provide both video data and format/i)).toBeInTheDocument();
    });

    test('handles video conversion and shows success message', async () => {
        render(<VideoConversionModule />);
        const file = new Blob(["fake data"], { type: 'video/mp4' });
        fireEvent.change(screen.getByRole('file'), { target: { files: [file] } });
        fireEvent.change(screen.getByPlaceholderText('Enter desired format'), { target: { value: 'mp4' } });
        fireEvent.click(screen.getByRole('button', { name: /Convert Video/i }));
        const successMessage = await screen.findByText(/Video conversion successful!/);
        expect(successMessage).toBeInTheDocument();
    });
});