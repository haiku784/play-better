import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import UserProfileForm from './UserProfileForm';

describe('UserProfileForm', () => {
    it('submits the form and calls onSuccess on success', async () => {
        const onSuccess = jest.fn();
        const onError = jest.fn();
        const { getByPlaceholderText, getByText } = render(<UserProfileForm onSuccess={onSuccess} onError={onError} />);

        fireEvent.change(getByPlaceholderText('User ID'), { target: { value: 'user123' } });
        // Simulating other input changes for preferredGames and gamingStyles

        fireEvent.click(getByText('Submit'));

        await waitFor(() => expect(onSuccess).toHaveBeenCalled());
    });

    it('calls onError when submission fails', async () => {
        const onSuccess = jest.fn();
        const onError = jest.fn();
        const { getByPlaceholderText, getByText } = render(<UserProfileForm onSuccess={onSuccess} onError={onError} />);

        fireEvent.change(getByPlaceholderText('User ID'), { target: { value: 'user123' } });
        // Simulating other input changes for preferredGames and gamingStyles

        fireEvent.click(getByText('Submit'));

        await waitFor(() => expect(onError).toHaveBeenCalled());
    });
});