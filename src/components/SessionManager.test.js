import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SessionManager from './SessionManager';

// Tests for the SessionManager component
describe('SessionManager', () => {
    test('renders session manager and controls', () => {
        render(<SessionManager />);
        expect(screen.getByText(/Session Manager/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Start Session/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Stop Session/i })).toBeInTheDocument();
    });

    test('starts a session', () => {
        render(<SessionManager />);
        fireEvent.click(screen.getByRole('button', { name: /Start Session/i }));
        expect(screen.getByText(/user123 - session456 - success/i)).toBeInTheDocument();
    });

    test('stops a session', () => {
        render(<SessionManager />);
        fireEvent.click(screen.getByRole('button', { name: /Start Session/i }));
        fireEvent.click(screen.getByRole('button', { name: /Stop Session/i }));
        expect(screen.queryByText(/user123 - session456 - success/i)).not.toBeInTheDocument();
    });
});