import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import MatchDataCollectionForm from './MatchDataCollectionForm';
import matchDataService from '../services/matchDataService';

jest.mock('../services/matchDataService');

test('submits form successfully', async () => {
    matchDataService.submitMatchData.mockResolvedValueOnce({ status: 'success', message: 'Data submitted successfully.' });
    const { getByLabelText, getByText } = render(<MatchDataCollectionForm onSuccess={jest.fn()} onError={jest.fn()} />);

    fireEvent.change(getByLabelText(/Match ID/i), { target: { value: '12345' } });
    fireEvent.change(getByLabelText(/Player Stats/i), { target: { value: JSON.stringify([{score: 10}]) } });
    fireEvent.change(getByLabelText(/Game Events/i), { target: { value: JSON.stringify([{event: 'goal'}]) } });
    fireEvent.click(getByText(/Submit/i));

    await waitFor(() => {
        expect(getByText(/Status: success/i)).toBeInTheDocument();
    });
});

test('displays error on failed submission', async () => {
    matchDataService.submitMatchData.mockResolvedValueOnce({ status: 'error', message: 'Submission failed.' });
    const { getByLabelText, getByText } = render(<MatchDataCollectionForm onSuccess={jest.fn()} onError={jest.fn()} />);

    fireEvent.change(getByLabelText(/Match ID/i), { target: { value: '12345' } });
    fireEvent.change(getByLabelText(/Player Stats/i), { target: { value: JSON.stringify([{score: 10}]) } });
    fireEvent.change(getByLabelText(/Game Events/i), { target: { value: JSON.stringify([{event: 'goal'}]) } });
    fireEvent.click(getByText(/Submit/i));

    await waitFor(() => {
        expect(getByText(/Error: Submission failed/i)).toBeInTheDocument();
    });
});