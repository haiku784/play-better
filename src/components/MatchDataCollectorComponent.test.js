import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import MatchDataCollector from './MatchDataCollectorComponent';

describe('MatchDataCollector', () => {
    test('renders correctly and collects match data', async () => {
        const mockOnDataCollected = jest.fn();
        render(<MatchDataCollector onDataCollected={mockOnDataCollected} />);

        fireEvent.change(screen.getByPlaceholderText(/Match ID/i), { target: { value: '12345' } });
        fireEvent.change(screen.getByPlaceholderText(/Timestamp/i), { target: { value: '2025-01-27T09:21:53' } });

        fireEvent.click(screen.getByText(/Collect Match Data/i));

        // Mock fetch response here and assert that onDataCollected is called with the correct data
    });
});