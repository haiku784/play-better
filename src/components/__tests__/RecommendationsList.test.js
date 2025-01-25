import React from 'react';
import { render, screen } from '@testing-library/react';
import RecommendationsList from '../RecommendationsList';

describe('RecommendationsList Component', () => {
    test('renders with recommendations', () => {
        const recommendations = ['Item 1', 'Item 2'];
        render(<RecommendationsList user_id="123" recommendations={recommendations} timestamp="2025-01-25T09:28:54" />);
        expect(screen.getByText(/recommendations/i)).toBeInTheDocument();
        expect(screen.getByText(/item 1/i)).toBeInTheDocument();
        expect(screen.getByText(/item 2/i)).toBeInTheDocument();
    });

    test('renders no recommendations message', () => {
        render(<RecommendationsList user_id="123" recommendations={[]} timestamp="2025-01-25T09:28:54" />);
        expect(screen.getByText(/no recommendations available/i)).toBeInTheDocument();
    });
});