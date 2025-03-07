import React, { useEffect, useState } from 'react';
import './IntegrationService.css';

/**
 * IntegrationService component handles the integrations with external gaming platforms.
 * It allows users to create, fetch, and delete integrations.
 */
const IntegrationService = () => {
  const [integrations, setIntegrations] = useState([]);
  const [newIntegration, setNewIntegration] = useState('');

  /**
   * Fetches the list of integrations from the API.
   */
  const fetchIntegrations = async () => {
    const response = await fetch('/integrations/');
    const data = await response.json();
    setIntegrations(data);
  };

  /**
   * Creates a new integration.
   * @param {string} platform - The platform to integrate with.
   */
  const createIntegration = async (platform) => {
    await fetch('/integrations/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ platform }),
    });
    fetchIntegrations(); // Refresh the list after creation
  };

  /**
   * Deletes an integration by platform ID.
   * @param {string} platformId - The ID of the platform to delete.
   */
  const deleteIntegration = async (platformId) => {
    await fetch(`/integrations/${platformId}/`, { method: 'DELETE' });
    fetchIntegrations(); // Refresh the list after deletion
  };

  useEffect(() => {
    fetchIntegrations();
  }, []);

  return (
    <div className="integration-service">
      <h2>Integrations</h2>
      <input
        type="text"
        value={newIntegration}
        onChange={(e) => setNewIntegration(e.target.value)}
        placeholder="Enter platform name"
      />
      <button onClick={() => createIntegration(newIntegration)}>Add Integration</button>
      <ul>
        {integrations.map((integration) => (
          <li key={integration.platformId} className="integration-item">
            {integration.platform}
            <button onClick={() => deleteIntegration(integration.platformId)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IntegrationService;