import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import IntegrationService from './IntegrationService';

/**
 * Integration tests for IntegrationService component.
 */
describe('IntegrationService Integration Tests', () => {
  test('fetches and displays integrations', async () => {
    // Mock the fetch API response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ platformId: '1', platform: 'Steam' }]),
      })
    );

    render(<IntegrationService />);

    await waitFor(() => {
      const integrationElement = screen.getByText(/Steam/i);
      expect(integrationElement).toBeInTheDocument();
    });
  });

  test('creates and deletes an integration', async () => {
    // Mock the fetch API response for creating integration
    global.fetch = jest.fn((url, options) => {
      if (options.method === 'POST') {
        return Promise.resolve({
          json: () => Promise.resolve({ platformId: '2', platform: options.body }),
        });
      }
      return Promise.resolve({
        json: () => Promise.resolve([]),
      });
    });

    render(<IntegrationService />);

    const inputElement = screen.getByPlaceholderText(/Enter platform name/i);
    const buttonElement = screen.getByText(/Add Integration/i);

    fireEvent.change(inputElement, { target: { value: 'Origin' } });
    fireEvent.click(buttonElement);

    await waitFor(() => {
      const newIntegrationElement = screen.getByText(/Origin/i);
      expect(newIntegrationElement).toBeInTheDocument();
    });

    // Mock the fetch API response for deleting integration
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      })
    );

    const deleteButton = screen.getByText(/Delete/i);
    fireEvent.click(deleteButton);

    await waitFor(() => {
      const deletedIntegrationElement = screen.queryByText(/Origin/i);
      expect(deletedIntegrationElement).not.toBeInTheDocument();
    });
  });
});