import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HighlightEventsForm from './HighlightEventsForm';

test('renders HighlightEventsForm', () => {
    render(<HighlightEventsForm />);
    expect(screen.getByPlaceholderText(/match id/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
});

test('submits form with valid input', async () => {
    const { getByPlaceholderText, getByText } = render(<HighlightEventsForm />);
    fireEvent.change(getByPlaceholderText(/match id/i), { target: { value: '12345' } });
    fireEvent.change(getByText(/goal/i), { target: { selected: true } });
    fireEvent.click(getByRole('button', { name: /submit/i }));
    // Additional assertions can be made based on mock response
});