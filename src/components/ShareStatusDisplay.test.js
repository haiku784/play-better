import React from 'react';
import { render, screen } from '@testing-library/react';
import ShareStatusDisplay from './ShareStatusDisplay';

/**
 * Test cases for the ShareStatusDisplay component.
 */
describe('ShareStatusDisplay Component', () => {
    test('renders success message', () => {
        render(<ShareStatusDisplay submissionStatus="success" share_link="http://example.com" />);
        expect(screen.getByText(/Content shared successfully!/)).toBeInTheDocument();
    });

    test('renders error message', () => {
        render(<ShareStatusDisplay submissionStatus="error" error_message="Failed to share." />);
        expect(screen.getByText(/Error sharing content:/)).toBeInTheDocument();
    });

    test('renders pending message', () => {
        render(<ShareStatusDisplay submissionStatus="pending" />);
        expect(screen.getByText(/Sharing content, please wait.../)).toBeInTheDocument();
    });

    test('renders no message for default status', () => {
        render(<ShareStatusDisplay submissionStatus="unknown" />);
        expect(screen.queryByText(/Content shared successfully!/)).not.toBeInTheDocument();
    });
});