import { render, screen, fireEvent } from '@testing-library/react';
import VideoAnnotationInput from '../VideoAnnotationInput';

describe('VideoAnnotationInput', () => {
    test('renders input field and button', () => {
        render(<VideoAnnotationInput />);
        const inputElement = screen.getByPlaceholderText(/add annotation/i);
        const buttonElement = screen.getByRole('button', { name: /add annotation/i });
        expect(inputElement).toBeInTheDocument();
        expect(buttonElement).toBeInTheDocument();
    });

    test('allows user to add an annotation', () => {
        render(<VideoAnnotationInput />);
        const inputElement = screen.getByPlaceholderText(/add annotation/i);
        const buttonElement = screen.getByRole('button', { name: /add annotation/i });

        fireEvent.change(inputElement, { target: { value: 'Test annotation' } });
        fireEvent.click(buttonElement);

        expect(inputElement.value).toBe(''); // Input should clear after adding
    });
});