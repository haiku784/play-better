import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import MatchDataCollectionForm from './MatchDataCollectionForm';

describe('MatchDataCollectionForm', () => {
    test('submits form data correctly', async () => {
        const onSuccess = jest.fn();
        const onError = jest.fn();
        const { getByLabelText, getByText } = render(<MatchDataCollectionForm onSuccess={onSuccess} onError={onError} />);

        fireEvent.change(getByLabelText(/Match ID/i), { target: { value: 'match123' } });
        fireEvent.change(getByLabelText(/Player Stats/i), { target: { value: '[{"score": 10}]' } });
        fireEvent.change(getByLabelText(/Game Events/i), { target: { value: '[{"event": "goal"}]' } });
        fireEvent.click(getByText(/Submit/i));

        await waitFor(() => expect(onSuccess).toHaveBeenCalled());
    });

    test('handles submission error', async () => {
        const onSuccess = jest.fn();
        const onError = jest.fn();
        const { getByLabelText, getByText } = render(<MatchDataCollectionForm onSuccess={onSuccess} onError={onError} />);

        // Simulate an error response
        global.fetch = jest.fn(() => Promise.reject(new Error('Submission failed')));

        fireEvent.change(getByLabelText(/Match ID/i), { target: { value: 'match123' } });
        fireEvent.change(getByLabelText(/Player Stats/i), { target: { value: '[{"score": 10}]' } });
        fireEvent.change(getByLabelText(/Game Events/i), { target: { value: '[{"event": "goal"}]' } });
        fireEvent.click(getByText(/Submit/i));

        await waitFor(() => expect(onError).toHaveBeenCalledWith({ errorMessage: 'Submission failed' }));
    });
});