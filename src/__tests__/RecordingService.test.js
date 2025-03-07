// src/__tests__/RecordingService.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RecordingService from '../components/RecordingService';

/**
 * Unit tests for RecordingService component.
 */
describe('RecordingService', () => {
    test('renders RecordingService component', () => {
        render(<RecordingService />);
        expect(screen.getByText(/Recording Service/i)).toBeInTheDocument();
    });

    test('starts and stops recording', async () => {
        render(<RecordingService />);
        const button = screen.getByRole('button');
        expect(button).toHaveTextContent('Start Recording');

        fireEvent.click(button);
        expect(button).toHaveTextContent('Stop Recording');

        fireEvent.click(button);
        expect(button).toHaveTextContent('Start Recording');
    });
});