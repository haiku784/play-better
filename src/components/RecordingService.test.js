import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RecordingService from './RecordingService';

/**
 * Unit tests for the RecordingService component.
 */
describe('RecordingService', () => {
    test('renders without crashing', () => {
        render(<RecordingService />);
        expect(screen.getByText(/Recording Service/i)).toBeInTheDocument();
    });

    test('starts recording', async () => {
        global.fetch = jest.fn(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ sessionId: '123' })
        }));

        render(<RecordingService />);
        fireEvent.click(screen.getByText(/Start Recording/i));
        expect(await screen.findByText(/Recording in progress.../i)).toBeInTheDocument();
    });

    test('stops recording', async () => {
        global.fetch = jest.fn(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({})
        }));

        render(<RecordingService />);
        fireEvent.click(screen.getByText(/Start Recording/i));
        fireEvent.click(screen.getByText(/Stop Recording/i));
        expect(await screen.findByText(/No recording in progress./i)).toBeInTheDocument();
    });

    test('handles errors', async () => {
        global.fetch = jest.fn(() => Promise.reject(new Error('Failed to start recording')));

        render(<RecordingService />);
        fireEvent.click(screen.getByText(/Start Recording/i));
        expect(await screen.findByText(/Error: Failed to start recording/i)).toBeInTheDocument();
    });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RecordingService from './RecordingService';

/**
 * Unit tests for the RecordingService component.
 */
describe('RecordingService', () => {
    test('renders without crashing', () => {
        render(<RecordingService />);
        expect(screen.getByText(/Recording Service/i)).toBeInTheDocument();
    });

    test('starts recording', async () => {
        global.fetch = jest.fn(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ sessionId: '123' })
        }));

        render(<RecordingService />);
        fireEvent.click(screen.getByText(/Start Recording/i));
        expect(await screen.findByText(/Recording in progress.../i)).toBeInTheDocument();
    });

    test('stops recording', async () => {
        global.fetch = jest.fn(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({})
        }));

        render(<RecordingService />);
        fireEvent.click(screen.getByText(/Start Recording/i));
        fireEvent.click(screen.getByText(/Stop Recording/i));
        expect(await screen.findByText(/No recording in progress./i)).toBeInTheDocument();
    });

    test('handles errors', async () => {
        global.fetch = jest.fn(() => Promise.reject(new Error('Failed to start recording')));

        render(<RecordingService />);
        fireEvent.click(screen.getByText(/Start Recording/i));
        expect(await screen.findByText(/Error: Failed to start recording/i)).toBeInTheDocument();
    });
});