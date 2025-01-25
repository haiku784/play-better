import React from 'react';
import { render, screen } from '@testing-library/react';
import HighlightedEventsList from './HighlightedEventsList';

/**
 * Tests for the HighlightedEventsList component.
 */
describe('HighlightedEventsList', () => {
    test('renders loading state', () => {
        render(<HighlightedEventsList highlights={[]} />);
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    test('renders error message', () => {
        render(<HighlightedEventsList highlights={[]} />);
        expect(screen.queryByText(/failed to load highlights/i)).toBeInTheDocument();
    });

    test('renders list of highlights', () => {
        const events = [{ id: '1', title: 'Event 1', isHighlighted: true }, { id: '2', title: 'Event 2', isHighlighted: false }];
        render(<HighlightedEventsList highlights={events} />);
        expect(screen.getByText('Event 1')).toBeInTheDocument();
        expect(screen.queryByText('Event 2')).not.toBeInTheDocument();
    });
});