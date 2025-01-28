import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GetUserProfileComponent from './GetUserProfileComponent';

describe('GetUserProfileComponent', () => {
    test('renders input and button', () => {
        render(<GetUserProfileComponent onProfileRetrieved={() => {}} />);
        expect(screen.getByPlaceholderText('Enter User ID')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Get User Profile/i })).toBeInTheDocument();
    });

    test('shows loading state when fetching data', async () => {
        render(<GetUserProfileComponent onProfileRetrieved={() => {}} />);
        fireEvent.change(screen.getByPlaceholderText('Enter User ID'), { target: { value: '123' } });
        fireEvent.click(screen.getByRole('button', { name: /Get User Profile/i }));
        expect(await screen.findByText(/Loading.../i)).toBeInTheDocument();
    });

    test('displays error message on fetch failure', async () => {
        global.fetch = jest.fn(() => Promise.reject(new Error('Fetch failed')));
        render(<GetUserProfileComponent onProfileRetrieved={() => {}} />);
        fireEvent.change(screen.getByPlaceholderText('Enter User ID'), { target: { value: '123' } });
        fireEvent.click(screen.getByRole('button', { name: /Get User Profile/i }));
        expect(await screen.findByText(/Fetch failed/i)).toBeInTheDocument();
    });
});