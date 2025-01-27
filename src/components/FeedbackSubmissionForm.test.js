import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FeedbackSubmissionForm from './FeedbackSubmissionForm';

describe('FeedbackSubmissionForm', () => {
  test('renders form fields correctly', () => {
    render(<FeedbackSubmissionForm onSubmitSuccess={() => {}} onSubmitError={() => {}} />);
    expect(screen.getByPlaceholderText(/User ID/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Product ID/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Your feedback/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  test('submits the form with correct data', async () => {
    const handleSubmitSuccess = jest.fn();
    const handleSubmitError = jest.fn();
    render(<FeedbackSubmissionForm onSubmitSuccess={handleSubmitSuccess} onSubmitError={handleSubmitError} />);

    fireEvent.change(screen.getByPlaceholderText(/User ID/i), { target: { value: '123' } });
    fireEvent.change(screen.getByPlaceholderText(/Product ID/i), { target: { value: 'product-456' } });
    fireEvent.change(screen.getByPlaceholderText(/Your feedback/i), { target: { value: 'Great product!' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '5' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Await for potential asynchronous operation
    await screen.findByText(/Feedback submitted successfully!/);
    expect(handleSubmitSuccess).toHaveBeenCalled();
  });

  test('handles submission errors', async () => {
    const handleSubmitSuccess = jest.fn();
    const handleSubmitError = jest.fn();
    render(<FeedbackSubmissionForm onSubmitSuccess={handleSubmitSuccess} onSubmitError={handleSubmitError} />);

    // Mocking random error throw during submission
    jest.spyOn(Math, 'random').mockReturnValue(0.4);

    fireEvent.change(screen.getByPlaceholderText(/User ID/i), { target: { value: '123' } });
    fireEvent.change(screen.getByPlaceholderText(/Product ID/i), { target: { value: 'product-456' } });
    fireEvent.change(screen.getByPlaceholderText(/Your feedback/i), { target: { value: 'Great product!' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '5' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Await for potential asynchronous operation
    await screen.findByText(/Error submitting feedback:/);
    expect(handleSubmitError).toHaveBeenCalled();
  });
});