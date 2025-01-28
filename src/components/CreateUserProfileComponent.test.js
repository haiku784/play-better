import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import CreateUserProfileComponent from './CreateUserProfileComponent';

describe('CreateUserProfileComponent', () => {
    test('submits form and displays success message', async () => {
        const onProfileCreated = jest.fn();
        const { getByPlaceholderText, getByText } = render(<CreateUserProfileComponent onProfileCreated={onProfileCreated} />);

        fireEvent.change(getByPlaceholderText('User ID'), { target: { value: 'user123' } });
        fireEvent.change(getByPlaceholderText('Gaming Preferences'), { target: { value: 'FPS, RPG' } });
        fireEvent.change(getByText('Select Skill Level'), { target: { value: 'beginner' } });
        fireEvent.click(getByText('Create Profile'));

        await waitFor(() => {
            expect(onProfileCreated).toHaveBeenCalledWith('success', 'Profile created successfully!');
            expect(getByText('Profile created successfully!')).toBeInTheDocument();
        });
    });

    test('displays error message on failure', async () => {
        const { getByPlaceholderText, getByText } = render(<CreateUserProfileComponent onProfileCreated={() => {}} />);

        fireEvent.change(getByPlaceholderText('User ID'), { target: { value: 'user123' } });
        fireEvent.change(getByPlaceholderText('Gaming Preferences'), { target: { value: 'FPS, RPG' } });
        fireEvent.change(getByText('Select Skill Level'), { target: { value: 'beginner' } });
        fireEvent.click(getByText('Create Profile'));

        await waitFor(() => {
            expect(getByText('Failed to create profile.')).toBeInTheDocument();
        });
    });
});