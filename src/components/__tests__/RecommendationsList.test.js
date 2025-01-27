import React from 'react';
import { render, screen } from '@testing-library/react';
import RecommendationsList from '../RecommendationsList';

/**
 * Unit tests for RecommendationsList component
 */
describe('RecommendationsList Component', () => {
    it('renders correctly when there are recommendations', () => {
        render(<RecommendationsList user_id="123" recommendations={["Gear1", "Gear2"]} timestamp="2025-01-25T09:28:54Z" />);
        expect(screen.getByText('Recommendations')).toBeInTheDocument();
        expect(screen.getByText('Gear1')).toBeInTheDocument();
        expect(screen.getByText('Gear2')).toBeInTheDocument();
        expect(screen.queryByText('No recommendations available.')).not.toBeInTheDocument();
    });

    it('renders correctly when there are no recommendations', () => {
        render(<RecommendationsList user_id="123" recommendations={[]} timestamp="2025-01-25T09:28:54Z" />);
        expect(screen.getByText('No recommendations available.')).toBeInTheDocument();
    });
});