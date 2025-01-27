import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MetricsOverlayManagement from './MetricsOverlayManagement';

// Test case for MetricsOverlayManagement component
describe('MetricsOverlayManagement', () => {
    test('renders correctly and allows user to set FPS and Latency', () => {
        const { getByPlaceholderText, getByText } = render(<MetricsOverlayManagement />);

        // Simulate setting FPS
        fireEvent.change(getByPlaceholderText('Enter FPS'), { target: { value: '30' } });
        fireEvent.click(getByText('Set FPS'));
        expect(getByText(/FPS Status:/)).toHaveTextContent('FPS Status: success');

        // Simulate setting Latency
        fireEvent.change(getByPlaceholderText('Enter Latency'), { target: { value: '150' } });
        fireEvent.click(getByText('Set Latency'));
        expect(getByText(/Latency Status:/)).toHaveTextContent('Latency Status: success');
    });
});