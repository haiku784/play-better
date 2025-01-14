import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GameplayMetricsForm from './GameplayMetricsForm';

describe('GameplayMetricsForm Component', () => {
    test('renders form fields correctly', () => {
        render(<GameplayMetricsForm />);
        expect(screen.getByLabelText(/kills/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/deaths/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/completion rate/i)).toBeInTheDocument();
    });

    test('validates input values', async () => {
        render(<GameplayMetricsForm />);

        fireEvent.change(screen.getByLabelText(/kills/i), { target: { value: -1 } });
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));
        expect(await screen.findByText(/invalid input values/i)).toBeInTheDocument();

        fireEvent.change(screen.getByLabelText(/kills/i), { target: { value: 5 } });
        fireEvent.change(screen.getByLabelText(/deaths/i), { target: { value: 2 } });
        fireEvent.change(screen.getByLabelText(/completion rate/i), { target: { value: 110 } });
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));
        expect(await screen.findByText(/invalid input values/i)).toBeInTheDocument();
    });

    test('handles successful submission', async () => {
        global.fetch = jest.fn(() => Promise.resolve({ ok: true }));
        render(<GameplayMetricsForm />);

        fireEvent.change(screen.getByLabelText(/kills/i), { target: { value: 5 } });
        fireEvent.change(screen.getByLabelText(/deaths/i), { target: { value: 2 } });
        fireEvent.change(screen.getByLabelText(/completion rate/i), { target: { value: 50 } });
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        expect(await screen.findByText(/metrics submitted successfully/i)).toBeInTheDocument();
    });

    test('handles submission error', async () => {
        global.fetch = jest.fn(() => Promise.resolve({ ok: false }));
        render(<GameplayMetricsForm />);

        fireEvent.change(screen.getByLabelText(/kills/i), { target: { value: 5 } });
        fireEvent.change(screen.getByLabelText(/deaths/i), { target: { value: 2 } });
        fireEvent.change(screen.getByLabelText(/completion rate/i), { target: { value: 50 } });
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        expect(await screen.findByText(/failed to submit metrics/i)).toBeInTheDocument();
    });
});