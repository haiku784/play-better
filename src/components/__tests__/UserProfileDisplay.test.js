import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserProfileDisplay from '../UserProfileDisplay';

jest.mock('../RecommendationsList', () => () => <div>Recommendations</div>);

describe('UserProfileDisplay', () => {
    test('renders loading state', () => {
        render(<UserProfileDisplay user_id='123' recommended_items={[]} />);
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });
    
    // Mock fetch implementation for the tests
    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ preferences: ['Gear A', 'Gear B'], purchase_history: ['Item 1', 'Item 2'] })
            })
        );
    });

    test('renders user profile data', async () => {
        render(<UserProfileDisplay user_id='123' recommended_items={[]} />);
        expect(await screen.findByText(/User ID: 123/i)).toBeInTheDocument();
        expect(await screen.findByText(/Preferences/i)).toBeInTheDocument();
        expect(await screen.findByText(/Gear A, Gear B/i)).toBeInTheDocument();
        expect(await screen.findByText(/Purchase History/i)).toBeInTheDocument();
        expect(await screen.findByText(/Item 1, Item 2/i)).toBeInTheDocument();
    });
    
    test('renders error message on fetch failure', async () => {
        global.fetch.mockImplementationOnce(() => Promise.reject(new Error('Fetch error')));
        render(<UserProfileDisplay user_id='123' recommended_items={[]} />);
        expect(await screen.findByText(/Error fetching user profile./i)).toBeInTheDocument();
    });
});