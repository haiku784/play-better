import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ExportVideoComponent from './ExportVideoComponent';

describe('ExportVideoComponent', () => {
    test('renders export form', () => {
        render(<ExportVideoComponent />);
        expect(screen.getByPlaceholderText(/User ID/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Video ID/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Export/i })).toBeInTheDocument();
    });

    test('initiates export on button click', async () => {
        render(<ExportVideoComponent />);
        fireEvent.change(screen.getByPlaceholderText(/User ID/i), { target: { value: '12345' } });
        fireEvent.change(screen.getByPlaceholderText(/Video ID/i), { target: { value: '67890' } });
        fireEvent.change(screen.getByRole('combobox'), { target: { value: 'MP4' } });
        fireEvent.click(screen.getByRole('button', { name: /Export/i }));
        expect(await screen.findByText(/Exporting video.../i)).toBeInTheDocument();
    });
});