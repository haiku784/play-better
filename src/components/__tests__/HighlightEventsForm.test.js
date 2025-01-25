import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import HighlightEventsForm from './HighlightEventsForm';
import highlightEventsService from '../services/highlightEventsService';

jest.mock('../services/highlightEventsService');

describe('HighlightEventsForm', () => {
  test('submits form and shows success message', async () => {
    highlightEventsService.mockResolvedValueOnce({ highlights: [] });
    const { getByPlaceholderText, getByText } = render(<HighlightEventsForm onSubmit={highlightEventsService} />);

    fireEvent.change(getByPlaceholderText('Match ID'), { target: { value: 'match123' } });
    fireEvent.change(getByText('Goals'), { target: { selected: true } });
    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(getByText('Submission Successful!')).toBeInTheDocument();
    });
  });

  test('shows error message on submit failure', async () => {
    highlightEventsService.mockRejectedValueOnce(new Error('Submission failed'));
    const { getByPlaceholderText, getByText } = render(<HighlightEventsForm onSubmit={highlightEventsService} />);

    fireEvent.change(getByPlaceholderText('Match ID'), { target: { value: 'match123' } });
    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(getByText('Submission failed. Please try again.')).toBeInTheDocument();
    });
  });
});