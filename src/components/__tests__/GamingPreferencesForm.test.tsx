import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import GamingPreferencesForm from './GamingPreferencesForm';

describe('GamingPreferencesForm', () => {
    test('valid submission', async () => {
        const { getByLabelText, getByText } = render(<GamingPreferencesForm />);
        fireEvent.change(getByLabelText(/game title/i), { target: { value: 'Game A' } });
        fireEvent.change(getByLabelText(/play style/i), { target: { value: 'Aggressive' } });
        fireEvent.change(getByLabelText(/budget/i), { target: { value: 50 } });
        fireEvent.click(getByText(/submit preferences/i));
        await waitFor(() => expect(getByText(/submitted successfully/i)).toBeInTheDocument());
    });

    test('error on empty fields', async () => {
        const { getByText } = render(<GamingPreferencesForm />);
        fireEvent.click(getByText(/submit preferences/i));
        expect(getByText(/game title is required/i)).toBeInTheDocument();
        expect(getByText(/play style is required/i)).toBeInTheDocument();
    });

    test('error on invalid budget', async () => {
        const { getByLabelText, getByText } = render(<GamingPreferencesForm />);
        fireEvent.change(getByLabelText(/budget/i), { target: { value: -10 } });
        fireEvent.click(getByText(/submit preferences/i));
        expect(getByText(/budget must be a positive number/i)).toBeInTheDocument();
    });
});