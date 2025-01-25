import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import VideoRetrievalModule from './VideoRetrievalModule';

describe('VideoRetrievalModule', () => {
    test('should retrieve video data on button click', async () => {
        render(<VideoRetrievalModule />);

        fireEvent.change(screen.getByPlaceholderText('Video ID'), { target: { value: '123' } });
        fireEvent.change(screen.getByPlaceholderText('User ID'), { target: { value: '456' } });
        fireEvent.click(screen.getByText('Retrieve Video'));

        // Assertion will depend on how you mock your fetch or your API
        expect(await screen.findByText('Video retrieved successfully!')).toBeInTheDocument();
    });

    test('should show error message on retrieval failure', async () => {
        render(<VideoRetrievalModule />);

        fireEvent.change(screen.getByPlaceholderText('Video ID'), { target: { value: 'invalid' } });
        fireEvent.change(screen.getByPlaceholderText('User ID'), { target: { value: '456' } });
        fireEvent.click(screen.getByText('Retrieve Video'));

        expect(await screen.findByText(/failed to fetch video/i)).toBeInTheDocument();
    });
});