import { render, screen } from '@testing-library/react';
import GameplaySessionTrimmer from '../GameplaySessionTrimmer';

describe('GameplaySessionTrimmer', () => {
    test('renders input fields and button', () => {
        render(<GameplaySessionTrimmer />);
        expect(screen.getByRole('button')).toHaveTextContent('Trim Session');
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
});