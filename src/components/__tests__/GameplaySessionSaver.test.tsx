import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GameplaySessionSaver from '../GameplaySessionSaver';

describe('GameplaySessionSaver', () => {
    test('renders correctly', () => {
        render(<GameplaySessionSaver />);
        expect(screen.getByText(/Save Gameplay Session/i)).toBeInTheDocument();
    });

    test('handles format change', () => {
        render(<GameplaySessionSaver />);
        fireEvent.change(screen.getByLabelText(/Format/i), { target: { value: 'AVI' } });
        expect(screen.getByLabelText(/Format/i).value).toBe('AVI');
    });

    test('handles quality change', () => {
        render(<GameplaySessionSaver />);
        fireEvent.change(screen.getByLabelText(/Quality/i), { target: { value: 'High' } });
        expect(screen.getByLabelText(/Quality/i).value).toBe('High');
    });

    test('sends save request', async () => {
        global.fetch = jest.fn(() => Promise.resolve({ ok: true }));
        render(<GameplaySessionSaver />);
        fireEvent.click(screen.getByText(/Save/i));
        expect(global.fetch).toHaveBeenCalled();
    });
});