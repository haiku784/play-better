import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import DeleteUserProfileComponent from './DeleteUserProfileComponent';

describe('DeleteUserProfileComponent', () => {
    test('should delete user profile successfully', async () => {
        const mockOnProfileDeleted = jest.fn();
        const { getByPlaceholderText, getByText } = render(<DeleteUserProfileComponent onProfileDeleted={mockOnProfileDeleted} />);

        const userIdInput = getByPlaceholderText('Enter User ID');
        fireEvent.change(userIdInput, { target: { value: '12345' }});
        fireEvent.click(getByText('Delete Profile'));

        await waitFor(() => {
            expect(mockOnProfileDeleted).toHaveBeenCalledWith('success', expect.any(String));
        });
    });

    test('should show error message on failure', async () => {
        const mockOnProfileDeleted = jest.fn();
        const { getByPlaceholderText, getByText } = render(<DeleteUserProfileComponent onProfileDeleted={mockOnProfileDeleted} />);

        const userIdInput = getByPlaceholderText('Enter User ID');
        fireEvent.change(userIdInput, { target: { value: 'nonexistent' }});
        fireEvent.click(getByText('Delete Profile'));

        await waitFor(() => {
            expect(getByText(/An unexpected error occurred./)).toBeInTheDocument();
        });
    });
});