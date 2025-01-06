import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the main application with LazyLoadedComponent', () => {
    render(<App />);
    const appTitle = screen.getByText(/my react app/i);
    expect(appTitle).toBeInTheDocument();
});