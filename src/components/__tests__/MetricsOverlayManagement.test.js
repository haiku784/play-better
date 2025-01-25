import React from 'react';
import { render, screen } from '@testing-library/react';
import MetricsOverlayManagement from './MetricsOverlayManagement';

describe('MetricsOverlayManagement', () => {
    test('renders metrics overlay correctly', () => {
        render(<MetricsOverlayManagement />);
        expect(screen.getByText(/FPS:/)).toBeInTheDocument();
        expect(screen.getByText(/Latency:/)).toBeInTheDocument();
    });
});