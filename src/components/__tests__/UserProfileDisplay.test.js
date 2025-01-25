import React from 'react';
import { render, screen } from '@testing-library/react';
import UserProfileDisplay from '../UserProfileDisplay';

describe('UserProfileDisplay Component', () => {
    test('renders loading state', () => {
        render(<UserProfileDisplay user_id='123' recommended_items={[]} />);
        expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    });

    test('renders error message on fetch error', () => {
        // Mock fetch to simulate an error
        global.fetch = jest.fn(() => Promise.reject(new Error('Fetch error')));
        render(<UserProfileDisplay user_id='123' recommended_items={[]} />);
        expect(screen.getByText(/Error loading profile data/i)).toBeInTheDocument();
    });

    test('renders user profile data once fetched', async () => {
        // Mock fetch to return data
        global.fetch = jest.fn(() => 
            Promise.resolve({
                json: () => Promise.resolve({ preferences: ['RGB Mouse', 'Gaming Chair'], purchase_history: ['Headset', 'Monitor'] })
            })
        );
        render(<UserProfileDisplay user_id='123' recommended_items={['Keyboard', 'Mouse Pad']} />);
        expect(await screen.findByText(/User ID: 123/i)).toBeInTheDocument();
    });
});