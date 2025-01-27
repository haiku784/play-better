import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InsightsRetrievalComponent from './InsightsRetrievalComponent';

describe('InsightsRetrievalComponent', () => {
    it('renders the input fields and button', () => {
        render(<InsightsRetrievalComponent fetchInsights={() => {}} />);
        expect(screen.getByPlaceholderText('User ID')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Feedback ID')).toBeInTheDocument();
        expect(screen.getByText('Fetch Insights')).toBeInTheDocument();
    });

    it('fetches insights on button click', async () => {
        const fetchInsightsMock = jest.fn().mockResolvedValueOnce({
            insights: ['Insight 1', 'Insight 2'],
            followUpActions: ['Action 1', 'Action 2'],
        });
        render(<InsightsRetrievalComponent fetchInsights={fetchInsightsMock} />);

        fireEvent.change(screen.getByPlaceholderText('User ID'), { target: { value: 'user123' } });
        fireEvent.change(screen.getByPlaceholderText('Feedback ID'), { target: { value: 'feedback456' } });
        fireEvent.click(screen.getByText('Fetch Insights'));

        expect(fetchInsightsMock).toHaveBeenCalledWith('user123', 'feedback456');
        expect(await screen.findByText('Insight 1')).toBeInTheDocument();
        expect(await screen.findByText('Action 1')).toBeInTheDocument();
    });
});