import React from 'react';
import { render, screen } from '@testing-library/react';
import RecommendationList from './RecommendationList';

describe('RecommendationList Component', () => {
    const mockRecommendations = [
        { name: 'Gaming Mouse', description: 'High precision gaming mouse', price: 49.99 },
        { name: 'Gaming Keyboard', description: 'Mechanical gaming keyboard', price: 89.99 }
    ];

    test('renders recommendations correctly', () => {
        render(<RecommendationList recommendations={mockRecommendations} timestamp="2025-01-27T09:21:23.825Z" isEmpty={false} />);
        expect(screen.getByText(/Recommended E-Sport Gear/i)).toBeInTheDocument();
        expect(screen.getByText(/Gaming Mouse/i)).toBeInTheDocument();
        expect(screen.getByText(/Gaming Keyboard/i)).toBeInTheDocument();
    });

    test('displays message when no recommendations are present', () => {
        render(<RecommendationList recommendations={[]} timestamp="2025-01-27T09:21:23.825Z" isEmpty={true} />);
        expect(screen.getByText(/No recommendations to display/i)).toBeInTheDocument();
    });
});