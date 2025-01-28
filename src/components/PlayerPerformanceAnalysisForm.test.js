import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import PlayerPerformanceAnalysisForm from './PlayerPerformanceAnalysisForm';

test('submits form and processes performance metrics', async () => {
    const mockSubmit = jest.fn().mockResolvedValue({ performanceMetrics: { totalScore: 100, totalPlays: 10 } });
    const { getByLabelText, getByText } = render(<PlayerPerformanceAnalysisForm onSubmit={mockSubmit} />);

    fireEvent.change(getByLabelText(/player id/i), { target: { value: 'player123' } });
    fireEvent.change(getByLabelText(/match data/i), { target: { value: JSON.stringify([{ score: 50, plays: [] }, { score: 50, plays: [] }]) } });
    fireEvent.click(getByText(/analyze performance/i));

    await waitFor(() => expect(mockSubmit).toHaveBeenCalledWith({ playerId: 'player123', matchData: [{ score: 50, plays: [] }, { score: 50, plays: [] }] }));
    expect(getByText(/100/i)).toBeInTheDocument();
});