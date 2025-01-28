import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ExportStatusChecker from './ExportStatusChecker';

describe('ExportStatusChecker', () => {
    it('renders without crashing', () => {
        render(<ExportStatusChecker exportId="1234" onUpdate={() => {}} />);
        expect(screen.getByPlaceholderText('Export ID')).toBeInTheDocument();
    });

    it('calls onUpdate callback with correct values', async () => {
        const mockOnUpdate = jest.fn();
        render(<ExportStatusChecker exportId="1234" onUpdate={mockOnUpdate} />);
        fireEvent.click(screen.getByText('Check Status'));
        // Assuming the checkExportStatus function resolves successfully...
        expect(mockOnUpdate).toHaveBeenCalledWith(expect.any(Boolean), expect.any(Number));
    });

    it('displays error message on failure', async () => {
        // Mock checkExportStatus to reject
        jest.mock('../utils/exportRequest', () => ({
            checkExportStatus: jest.fn().mockRejectedValue(new Error('Failed to check status.')),
        }));

        render(<ExportStatusChecker exportId="1234" onUpdate={() => {}} />);
        fireEvent.click(screen.getByText('Check Status'));
        expect(await screen.findByText('Failed to check status.')).toBeInTheDocument();
    });
});