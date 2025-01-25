import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MatchReportViewer from './MatchReportViewer';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../services/matchReportService'); // Mock the service

describe('MatchReportViewer', () => {
    test('renders input and button', () => {
        render(<MatchReportViewer />);
        expect(screen.getByPlaceholderText(/Enter Match ID/i)).toBeInTheDocument();
        expect(screen.getByText(/Fetch Report/i)).toBeInTheDocument();
    });

    test('displays loading indicator when fetching', async () => {
        render(<MatchReportViewer />);
        fireEvent.change(screen.getByPlaceholderText(/Enter Match ID/i), { target: { value: '123' } });
        fireEvent.click(screen.getByText(/Fetch Report/i));
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    test('displays error message on fetch failure', async () => {
        fetchMatchReport.mockRejectedValue(new Error('Failed to fetch report'));
        render(<MatchReportViewer />);
        fireEvent.change(screen.getByPlaceholderText(/Enter Match ID/i), { target: { value: '123' } });
        fireEvent.click(screen.getByText(/Fetch Report/i));
        expect(await screen.findByText(/Failed to fetch report/i)).toBeInTheDocument();
    });

    test('displays report on successful fetch', async () => {
        fetchMatchReport.mockResolvedValue({ report: { score: 2, stats: [] } });
        render(<MatchReportViewer />);
        fireEvent.change(screen.getByPlaceholderText(/Enter Match ID/i), { target: { value: '123' } });
        fireEvent.click(screen.getByText(/Fetch Report/i));
        expect(await screen.findByText(JSON.stringify({ score: 2, stats: [] }))).toBeInTheDocument();
    });
});