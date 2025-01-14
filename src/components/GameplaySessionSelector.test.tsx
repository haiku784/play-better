import React from 'react';
import { render, screen } from '@testing-library/react';
import GameplaySessionSelector from './GameplaySessionSelector';

const mockSession = { id: 1, title: 'Test Session', duration: 120 }; // Mock session data

describe('GameplaySessionSelector', () => {
  it('renders session title', () => {
    render(<GameplaySessionSelector session={mockSession} />);
    expect(screen.getByText('Test Session')).toBeInTheDocument();
  });

  it('allows trimming start and end', () => {
    render(<GameplaySessionSelector session={mockSession} />);
    expect(screen.getByLabelText(/Trim Start/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Trim End/i)).toBeInTheDocument();
  });
});