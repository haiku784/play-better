import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import VideoRetrievalModule from '../VideoRetrievalModule';

describe('VideoRetrievalModule', () => {
    test('renders inputs and button', () => {
        const { getByPlaceholderText, getByText } = render(<VideoRetrievalModule />);
        expect(getByPlaceholderText('Video ID')).toBeInTheDocument();
        expect(getByPlaceholderText('User ID')).toBeInTheDocument();
        expect(getByText('Retrieve Video')).toBeInTheDocument();
    });

    test('handles successful video retrieval', async () => {
        const { getByPlaceholderText, getByText } = render(<VideoRetrievalModule />);
        fireEvent.change(getByPlaceholderText('Video ID'), { target: { value: '12345' } });
        fireEvent.change(getByPlaceholderText('User ID'), { target: { value: '67890' } });
        fireEvent.click(getByText('Retrieve Video'));

        // You would add more assertions here based on how you mock the fetch call
    });

    test('handles video retrieval error', async () => {
        const { getByPlaceholderText, getByText } = render(<VideoRetrievalModule />);
        fireEvent.change(getByPlaceholderText('Video ID'), { target: { value: 'invalid' } });
        fireEvent.change(getByPlaceholderText('User ID'), { target: { value: '67890' } });
        fireEvent.click(getByText('Retrieve Video'));

        // You would add more assertions here based on how you mock the fetch call
    });
});