import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MatchDataRetrieval from './MatchDataRetrieval';

jest.mock('./api', () => ({
    fetchMatchData: jest.fn()
}));

describe('MatchDataRetrieval Component', () => {
    test('renders input and button', () => {
        render(<MatchDataRetrieval />);
        expect(screen.getByPlaceholderText('Enter Match ID')).toBeInTheDocument();
        expect(screen.getByText('Retrieve Match Data')).toBeInTheDocument();
    });

    test('displays error message on fetch failure', async () => {
        global.fetch = jest.fn(() => Promise.reject(new Error('Failed to retrieve match data')));
        render(<MatchDataRetrieval />);
        fireEvent.click(screen.getByText('Retrieve Match Data'));
        const errorMessage = await screen.findByText('Failed to retrieve match data');
        expect(errorMessage).toBeInTheDocument();
    });
});