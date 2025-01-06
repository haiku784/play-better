import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import KeyboardNavigation from './KeyboardNavigation';

/**
 * Unit tests for the KeyboardNavigation component.
 */
describe('KeyboardNavigation component', () => {
    test('navigates with arrow keys', () => {
        const { getByText } = render(<KeyboardNavigation />);

        const startButton = getByText('Start Recording');
        const stopButton = getByText('Stop Recording');

        startButton.focus();
        fireEvent.keyDown(startButton, { key: 'ArrowDown' });
        expect(stopButton).toHaveFocus();

        fireEvent.keyDown(stopButton, { key: 'ArrowUp' });
        expect(startButton).toHaveFocus();
    });

    test('navigates to the first and last buttons', () => {
        const { getByText } = render(<KeyboardNavigation />);

        const startButton = getByText('Start Recording');
        const stopButton = getByText('Stop Recording');

        fireEvent.keyDown(stopButton, { key: 'Home' });
        expect(startButton).toHaveFocus();

        fireEvent.keyDown(startButton, { key: 'End' });
        expect(stopButton).toHaveFocus();
    });
});