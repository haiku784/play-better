import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ShareRequestForm from './ShareRequestForm';

describe('ShareRequestForm', () => {
    it('submits the form and calls onSubmit with correct values', async () => {
        const mockOnSubmit = jest.fn(() => Promise.resolve({ status: 'success', share_link: 'http://example.com' }));
        const { getByPlaceholderText, getByText } = render(<ShareRequestForm onSubmit={mockOnSubmit} handleSuccess={jest.fn()} handleError={jest.fn()} />);

        fireEvent.change(getByPlaceholderText('User ID'), { target: { value: 'user123' } });
        fireEvent.change(getByPlaceholderText('Gear ID'), { target: { value: 'gear456' } });
        fireEvent.change(getByPlaceholderText('Platform'), { target: { value: 'Facebook' } });
        fireEvent.change(getByPlaceholderText('Message'), { target: { value: 'Check this out!' } });

        fireEvent.click(getByText('Share'));

        await waitFor(() => expect(mockOnSubmit).toHaveBeenCalledWith({ user_id: 'user123', gear_id: 'gear456', platform: 'Facebook', message: 'Check this out!' }));
    });
});