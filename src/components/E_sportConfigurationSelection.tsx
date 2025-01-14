import React, { useState, useEffect } from 'react';

const E_sportConfigurationSelection = () => {
    const [configurations, setConfigurations] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);

    useEffect(() => {
        // Fetch configurations from API
        fetch('/api/configurations')
            .then(response => response.json())
            .then(data => setConfigurations(data));
    }, []);

    const handleSelection = (id) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    const compareSelected = () => {
        fetch('/compare-configurations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: 'user123', session_ids: selectedIds })
        }).then(response => response.json()).then(data => {
            console.log(data);
            // Handle the comparative metrics display
        });
    };

    return (
        <div>
            <h2>Select E-sport Configurations</h2>
            {configurations.map(config => (
                <div key={config.id}>
                    <input type="checkbox" onChange={() => handleSelection(config.id)} /> {config.name}
                </div>
            ))}
            <button onClick={compareSelected}>Compare</button>
        </div>
    );
};

export default E_sportConfigurationSelection;