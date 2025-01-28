import React from 'react';
import { render, screen } from '@testing-library/react';
import HighlightDetectionModule from './HighlightDetectionModule';

describe('HighlightDetectionModule', () => {
    it('renders detection status and detected moments correctly', () => {
        const mockGameData = {
            events: [
                { type: 'kill', details: 'Player1 killed Player2' },
                { type: 'objective', details: 'Player1 captured the flag' }
            ]
        };
        render(<HighlightDetectionModule game_data={mockGameData} criteria={null} />);

        expect(screen.getByText(/Detection complete/i)).toBeInTheDocument();
        expect(screen.getByText(/Player1 killed Player2/i)).toBeInTheDocument();
        expect(screen.getByText(/Player1 captured the flag/i)).toBeInTheDocument();
    });
});