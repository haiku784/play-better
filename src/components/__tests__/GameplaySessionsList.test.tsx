import { render, screen } from '@testing-library/react';
import GameplaySessionsList from '../GameplaySessionsList';

jest.mock('../hooks/useFetch', () => ({
    useFetch: jest.fn(() => ({ data: [], loading: false }))
}));

describe('GameplaySessionsList', () => {
    test('renders loading state', () => {
        render(<GameplaySessionsList />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('renders sessions when data is available', () => {
        render(<GameplaySessionsList />);
        // Mock the useFetch to return sample data
        // Expect list items to be rendered
    });
});