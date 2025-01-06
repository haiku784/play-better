import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import PerformanceMetricsAPI from './PerformanceMetricsAPI';
import axios from 'axios';

jest.mock('axios');

describe('PerformanceMetricsAPI', () => {
    test('renders loading state', () => {
        render(<PerformanceMetricsAPI />);
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    test('renders metrics when fetched successfully', async () => {
        const metrics = [{ name: 'Metric 1', value: 100 }, { name: 'Metric 2', value: 200 }];
        axios.get.mockResolvedValue({ data: metrics });

        render(<PerformanceMetricsAPI />);

        await waitFor(() => expect(screen.getByText(/Metric 1/i)).toBeInTheDocument());
        expect(screen.getByText(/Metric 1: 100/i)).toBeInTheDocument();
        expect(screen.getByText(/Metric 2: 200/i)).toBeInTheDocument();
    });

    test('renders error message when fetch fails', async () => {
        axios.get.mockRejectedValue(new Error('Network Error'));

        render(<PerformanceMetricsAPI />);

        await waitFor(() => expect(screen.getByText(/Error fetching metrics/i)).toBeInTheDocument());
    });
});