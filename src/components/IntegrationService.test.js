import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import IntegrationService from './IntegrationService';

/**
 * Unit tests for IntegrationService component.
 */
describe('IntegrationService', () => {
  test('renders integration service', () => {
    render(<IntegrationService />);
    const headingElement = screen.getByText(/Integrations/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('adds a new integration', async () => {
    render(<IntegrationService />);
    const inputElement = screen.getByPlaceholderText(/Enter platform name/i);
    const buttonElement = screen.getByText(/Add Integration/i);

    fireEvent.change(inputElement, { target: { value: 'Steam' } });
    fireEvent.click(buttonElement);

    const newIntegrationElement = await screen.findByText(/Steam/i);
    expect(newIntegrationElement).toBeInTheDocument();
  });

  test('deletes an integration', async () => {
    render(<IntegrationService />);
    const inputElement = screen.getByPlaceholderText(/Enter platform name/i);
    const buttonElement = screen.getByText(/Add Integration/i);

    fireEvent.change(inputElement, { target: { value: 'Xbox Live' } });
    fireEvent.click(buttonElement);

    const deleteButton = await screen.findByText(/Delete/i);
    fireEvent.click(deleteButton);

    const deletedIntegrationElement = screen.queryByText(/Xbox Live/i);
    expect(deletedIntegrationElement).not.toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import IntegrationService from './IntegrationService';
import './global.css'; // Import global styles

/**
 * Unit tests for IntegrationService component.
 */
describe('IntegrationService', () => {
  test('renders integration service', () => {
    render(<IntegrationService />);
    const headingElement = screen.getByText(/Integrations/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('adds a new integration', async () => {
    render(<IntegrationService />);
    const inputElement = screen.getByPlaceholderText(/Enter platform name/i);
    const buttonElement = screen.getByText(/Add Integration/i);

    fireEvent.change(inputElement, { target: { value: 'Steam' } });
    fireEvent.click(buttonElement);

    const newIntegrationElement = await screen.findByText(/Steam/i);
    expect(newIntegrationElement).toBeInTheDocument();
  });

  test('deletes an integration', async () => {
    render(<IntegrationService />);
    const inputElement = screen.getByPlaceholderText(/Enter platform name/i);
    const buttonElement = screen.getByText(/Add Integration/i);

    fireEvent.change(inputElement, { target: { value: 'Xbox Live' } });
    fireEvent.click(buttonElement);

    const deleteButton = await screen.findByText(/Delete/i);
    fireEvent.click(deleteButton);

    const deletedIntegrationElement = screen.queryByText(/Xbox Live/i);
    expect(deletedIntegrationElement).not.toBeInTheDocument();
  });
});