import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import RecordButton from './RecordButton';
import axios from 'axios';

jest.mock('axios');

describe('RecordButton Component', () => {
    const apiUrl = 'https://api.example.com/record';

    it('should render Record button initially', () => {
        render(<RecordButton apiUrl={apiUrl} />);
        expect(screen.getByRole('button')).toHaveTextContent('Record');
    });

    it('should call start API when clicked and change button to Stop', async () => {
        (axios.post as jest.Mock).mockResolvedValue({ status: 200 });
        render(<RecordButton apiUrl={apiUrl} />);

        fireEvent.click(screen.getByRole('button'));
        expect(axios.post).toHaveBeenCalledWith(`${apiUrl}/start`);
        expect(await screen.findByRole('button')).toHaveTextContent('Stop');
    });

    it('should call stop API when clicked again and change button to Record', async () => {
        (axios.post as jest.Mock).mockResolvedValue({ status: 200 });
        render(<RecordButton apiUrl={apiUrl} />);

        fireEvent.click(screen.getByRole('button')); // Start recording
        fireEvent.click(await screen.findByRole('button')); // Stop recording
        expect(axios.post).toHaveBeenCalledWith(`${apiUrl}/stop`);
        expect(await screen.findByRole('button')).toHaveTextContent('Record');
    });
});