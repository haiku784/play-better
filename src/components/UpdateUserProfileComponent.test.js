import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import UpdateUserProfileComponent from './UpdateUserProfileComponent';

describe('UpdateUserProfileComponent', () => {
    it('should update user profile and call onProfileUpdated', async () => {
        const mockOnProfileUpdated = jest.fn();
        const { getByPlaceholderText, getByText } = render(<UpdateUserProfileComponent onProfileUpdated={mockOnProfileUpdated} />);

        fireEvent.change(getByPlaceholderText('User ID'), { target: { value: '12345' } });
        fireEvent.change(getByPlaceholderText('Preferences (comma separated)'), { target: { value: 'FPS, RPG' } });
        fireEvent.change(getByPlaceholderText('Recommended Gear (comma separated)'), { target: { value: 'Mouse, Keyboard' } });
        fireEvent.change(getByText('Select Skill Level'), { target: { value: 'intermediate' } });

        fireEvent.click(getByText('Update Profile'));

        await waitFor(() => {
            expect(mockOnProfileUpdated).toHaveBeenCalledWith({ status: 'success', message: 'Profile updated successfully!' });
        });
    });

    it('should display error message on failure', async () => {
        const { getByPlaceholderText, getByText } = render(<UpdateUserProfileComponent onProfileUpdated={() => {}} />);

        fireEvent.change(getByPlaceholderText('User ID'), { target: { value: '' } }); // Simulate missing user ID
        fireEvent.click(getByText('Update Profile'));

        await waitFor(() => {
            expect(getByText('Profile update failed. User ID is required.')).toBeInTheDocument();
        });
    });
});