import { render, screen } from '@testing-library/react';
import ComparativeMetricsDashboard from '../ComparativeMetricsDashboard';
import * as api from '../../api/comparative_metrics_api';

jest.mock('../../api/comparative_metrics_api');

test('renders loading state', () => {
  (api.fetchComparativeMetrics as jest.Mock).mockResolvedValueOnce({ data: [] });
  render(<ComparativeMetricsDashboard />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

test('renders error message', async () => {
  (api.fetchComparativeMetrics as jest.Mock).mockRejectedValueOnce(new Error('Error fetching metrics'));
  render(<ComparativeMetricsDashboard />);
  expect(await screen.findByText(/error fetching metrics/i)).toBeInTheDocument();
});

test('renders metric table', async () => {
  (api.fetchComparativeMetrics as jest.Mock).mockResolvedValueOnce({ data: [{ configuration: 'Config1', value: 85 }] });
  render(<ComparativeMetricsDashboard />);
  expect(await screen.findByText(/Config1/i)).toBeInTheDocument();
  expect(await screen.findByText(/85/i)).toBeInTheDocument();
});