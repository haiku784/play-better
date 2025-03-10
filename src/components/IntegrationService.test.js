import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import IntegrationService from './IntegrationService';

/**
 * Unit tests for IntegrationService component.
 */
describe('IntegrationService', () => {
    test('renders IntegrationService component', () => {
        render(<IntegrationService />);
        const headingElement = screen.getByText(/Integration Service/i);
        expect(headingElement).toBeInTheDocument();
    });

    test('adds a new integration', async () => {
        render(<IntegrationService />);
        const inputElement = screen.getByPlaceholderText(/Add new integration/i);
        const buttonElement = screen.getByText(/Add Integration/i);

        fireEvent.change(inputElement, { target: { value: 'New Integration' } });
        fireEvent.click(buttonElement);

        const newIntegrationElement = await screen.findByText(/New Integration/i);
        expect(newIntegrationElement).toBeInTheDocument();
    });

    test('removes an integration', async () => {
        render(<IntegrationService />);
        const inputElement = screen.getByPlaceholderText(/Add new integration/i);
        const buttonElement = screen.getByText(/Add Integration/i);

        fireEvent.change(inputElement, { target: { value: 'Integration to Remove' } });
        fireEvent.click(buttonElement);

        const removeButton = await screen.findByText(/Remove/i);
        fireEvent.click(removeButton);

        const removedIntegrationElement = screen.queryByText(/Integration to Remove/i);
        expect(removedIntegrationElement).not.toBeInTheDocument();
    });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import IntegrationService from './IntegrationService';

/**
 * Unit tests for IntegrationService component.
 */
describe('IntegrationService', () => {
    test('renders IntegrationService component', () => {
        render(<IntegrationService />);
        const headingElement = screen.getByText(/Integration Service/i);
        expect(headingElement).toBeInTheDocument();
    });

    test('adds a new integration', async () => {
        render(<IntegrationService />);
        const inputElement = screen.getByPlaceholderText(/Add new integration/i);
        const buttonElement = screen.getByText(/Add Integration/i);

        fireEvent.change(inputElement, { target: { value: 'New Integration' } });
        fireEvent.click(buttonElement);

        const newIntegrationElement = await screen.findByText(/New Integration/i);
        expect(newIntegrationElement).toBeInTheDocument();
    });

    test('removes an integration', async () => {
        render(<IntegrationService />);
        const inputElement = screen.getByPlaceholderText(/Add new integration/i);
        const buttonElement = screen.getByText(/Add Integration/i);

        fireEvent.change(inputElement, { target: { value: 'Integration to Remove' } });
        fireEvent.click(buttonElement);

        const removeButton = await screen.findByText(/Remove/i);
        fireEvent.click(removeButton);

        const removedIntegrationElement = screen.queryByText(/Integration to Remove/i);
        expect(removedIntegrationElement).not.toBeInTheDocument();
    });
});