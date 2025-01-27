import React from 'react';
import { render, screen } from '@testing-library/react';
import HighlightedEventsList from '../HighlightedEventsList';

describe('HighlightedEventsList Component', () => {
    test('renders loading state', () => {
        render(<HighlightedEventsList highlights={[]} />);
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    test('renders error message when fetching fails', () => {
        // Simulating the scenario where fetching highlights fails
        const { getByText } = render(<HighlightedEventsList highlights={null} />);
        expect(getByText(/Error fetching highlights/i)).toBeInTheDocument();
    });

    test('displays highlights when available', () => {
        const highlights = [
            { id: '1', title: 'Highlight 1', isHighlighted: true },
            { id: '2', title: 'Highlight 2', isHighlighted: true }
        ];
        render(<HighlightedEventsList highlights={highlights} />);
        expect(screen.getByText(/Highlight 1/i)).toBeInTheDocument();
        expect(screen.getByText(/Highlight 2/i)).toBeInTheDocument();
    });
});