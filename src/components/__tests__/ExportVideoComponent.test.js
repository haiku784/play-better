import { render, screen, fireEvent } from '@testing-library/react';
import VideoConversionModule from '../VideoConversionModule';

describe('VideoConversionModule', () => {
    test('renders input elements', () => {
        render(<VideoConversionModule />);
        expect(screen.getByPlaceholderText(/Enter desired format/i)).toBeInTheDocument();
        expect(screen.getByText(/Convert Video/i)).toBeInTheDocument();
    });

    test('shows error message if fields are empty', async () => {
        render(<VideoConversionModule />);
        fireEvent.click(screen.getByText(/Convert Video/i));
        expect(await screen.findByText(/Video data and format are required./i)).toBeInTheDocument();
    });
});