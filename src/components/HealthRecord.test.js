import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HealthRecord from './HealthRecord';

/**
 * Unit tests for HealthRecord component.
 */
describe('HealthRecord Component', () => {
    test('renders Health Records heading', () => {
        render(<HealthRecord />);
        const headingElement = screen.getByText(/Health Records/i);
        expect(headingElement).toBeInTheDocument();
    });

    test('allows user to add a new health record', async () => {
        render(<HealthRecord />);
        const recordTypeInput = screen.getByPlaceholderText(/Record Type/i);
        const contentInput = screen.getByPlaceholderText(/Record Content/i);
        const submitButton = screen.getByText(/Add Record/i);

        fireEvent.change(recordTypeInput, { target: { value: 'Blood Test' } });
        fireEvent.change(contentInput, { target: { value: 'Results are normal.' } });
        fireEvent.click(submitButton);

        const newRecord = await screen.findByText(/Blood Test/i);
        expect(newRecord).toBeInTheDocument();
    });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import HealthRecord from './HealthRecord';

/**
 * Unit tests for HealthRecord component.
 */
describe('HealthRecord Component', () => {
    test('renders Health Records heading', () => {
        render(<HealthRecord />);
        const headingElement = screen.getByText(/Health Records/i);
        expect(headingElement).toBeInTheDocument();
    });

    test('allows user to add a new health record', async () => {
        render(<HealthRecord />);
        const recordTypeInput = screen.getByPlaceholderText(/Record Type/i);
        const contentInput = screen.getByPlaceholderText(/Record Content/i);
        const submitButton = screen.getByText(/Add Record/i);

        fireEvent.change(recordTypeInput, { target: { value: 'Blood Test' } });
        fireEvent.change(contentInput, { target: { value: 'Results are normal.' } });
        fireEvent.click(submitButton);

        const newRecord = await screen.findByText(/Blood Test/i);
        expect(newRecord).toBeInTheDocument();
    });
});