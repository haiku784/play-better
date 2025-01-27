import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import MatchReportViewer from './MatchReportViewer';

describe('MatchReportViewer Component', () => {
    test('renders input and button', () => {
        render(<MatchReportViewer />);
        expect(screen.getByPlaceholderText(/Enter Match ID/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Fetch Report/i })).toBeInTheDocument();
    });

    test('displays loading indicator when fetching report', async () => {
        render(<MatchReportViewer />);
        fireEvent.change(screen.getByPlaceholderText(/Enter Match ID/i), { target: { value: '12345' } });
        fireEvent.click(screen.getByRole('button', { name: /Fetch Report/i }));
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    test('shows error message when fetching fails', async () => {
        global.fetch = jest.fn(() => Promise.reject(new Error('Network Error')));
        render(<MatchReportViewer />);
        fireEvent.change(screen.getByPlaceholderText(/Enter Match ID/i), { target: { value: '12345' } });
        fireEvent.click(screen.getByRole('button', { name: /Fetch Report/i }));
        expect(await screen.findByText(/Network Error/i)).toBeInTheDocument();
    });

    test('shows match report when fetch is successful', async () => {
        const mockReport = { score: 3, possession: 70 };
        global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve(mockReport) }));
        render(<MatchReportViewer />);
        fireEvent.change(screen.getByPlaceholderText(/Enter Match ID/i), { target: { value: '12345' } });
        fireEvent.click(screen.getByRole('button', { name: /Fetch Report/i }));
        expect(await screen.findByText(/3/i)).toBeInTheDocument();
        expect(await screen.findByText(/70/i)).toBeInTheDocument();
    });
});