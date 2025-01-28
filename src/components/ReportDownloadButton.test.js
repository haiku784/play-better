import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ReportDownloadButton from './ReportDownloadButton';

describe('ReportDownloadButton', () => {
  test('renders button and tooltip', () => {
    render(<ReportDownloadButton reportUrl="http://example.com/report" isEnabled={true} onDownload={() => true} />);
    const button = screen.getByRole('button', { name: /download report/i });
    expect(button).toBeInTheDocument();
    expect(screen.getByText(/click to download/i)).toBeInTheDocument();
  });

  test('calls onDownload when clicked', () => {
    const mockDownload = jest.fn();
    render(<ReportDownloadButton reportUrl="http://example.com/report" isEnabled={true} onDownload={mockDownload} />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockDownload).toHaveBeenCalledWith({ reportUrl: "http://example.com/report" });
  });

  test('does not call onDownload when disabled', () => {
    const mockDownload = jest.fn();
    render(<ReportDownloadButton reportUrl="http://example.com/report" isEnabled={false} onDownload={mockDownload} />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockDownload).not.toHaveBeenCalled();
  });
});