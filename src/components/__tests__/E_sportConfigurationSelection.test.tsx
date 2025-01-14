import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import E_sportConfigurationSelection from './E_sportConfigurationSelection';
import axios from 'axios';

jest.mock('axios');

describe('E_sportConfigurationSelection', () => {
    test('renders loading state', () => {
        const { getByText } = render(<E_sportConfigurationSelection />);
        expect(getByText(/loading/i)).toBeInTheDocument();
    });

    test('fetches and displays configurations', async () => {
        const configurations = [{ id: '1', name: 'Config A', selected: false }];
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: configurations });
        const { getByText } = render(<E_sportConfigurationSelection />);
        await waitFor(() => expect(getByText('Config A')).toBeInTheDocument());
    });

    test('handles checkbox selection', async () => {
        const configurations = [{ id: '1', name: 'Config A', selected: false }];
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: configurations });
        const { getByText } = render(<E_sportConfigurationSelection />);
        await waitFor(() => expect(getByText('Config A')).toBeInTheDocument());
        fireEvent.click(getByText('Config A'));
        expect(getByText('Config A').querySelector('input')?.checked).toBe(true);
    });

    test('calls compare API on button click', async () => {
        const configurations = [{ id: '1', name: 'Config A', selected: true }];
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: configurations });
        (axios.post as jest.Mock).mockResolvedValueOnce({ data: {} });
        const { getByText } = render(<E_sportConfigurationSelection />);
        await waitFor(() => expect(getByText('Config A')).toBeInTheDocument());
        fireEvent.click(getByText('Compare'));
        await waitFor(() => expect(axios.post).toHaveBeenCalledWith('/api/compare', { configs: configurations }));
    });
});