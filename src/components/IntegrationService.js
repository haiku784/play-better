import React, { useEffect, useState } from 'react';
import './IntegrationService.css';

/**
 * IntegrationService component handles the integration with external health systems.
 * It allows users to view, add, and remove integrations.
 */
const IntegrationService = () => {
    const [integrations, setIntegrations] = useState([]);
    const [newIntegration, setNewIntegration] = useState('');
    const API_URL = 'http://localhost:5000/integrations'; // Replace with your API URL

    /**
     * Fetch all integrations from the server.
     */
    const fetchIntegrations = async () => {
        const response = await fetch(API_URL);
        const data = await response.json();
        setIntegrations(data);
    };

    /**
     * Add a new integration.
     * @param {string} integration - The name of the integration to add.
     */
    const addIntegration = async (integration) => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: integration }),
        });
        if (response.ok) {
            fetchIntegrations(); // Refresh the list
            setNewIntegration(''); // Clear input
        }
    };

    /**
     * Remove an integration by ID.
     * @param {number} id - The ID of the integration to remove.
     */
    const removeIntegration = async (id) => {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        fetchIntegrations(); // Refresh the list
    };

    useEffect(() => {
        fetchIntegrations();
    }, []);

    return (
        <div className="integration-service">
            <h2>Integration Service</h2>
            <input
                type="text"
                value={newIntegration}
                onChange={(e) => setNewIntegration(e.target.value)}
                placeholder="Add new integration"
            />
            <button onClick={() => addIntegration(newIntegration)}>Add Integration</button>
            <ul>
                {integrations.map(integration => (
                    <li key={integration.id} className="integration-item">
                        {integration.name}
                        <button onClick={() => removeIntegration(integration.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default IntegrationService;