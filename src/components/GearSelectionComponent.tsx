import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface GearOption {
    id: string;
    name: string;
    description: string;
}

const GearSelectionComponent: React.FC = () => {
    const [gearOptions, setGearOptions] = useState<GearOption[]>([]);
    const [selectedGears, setSelectedGears] = useState<Set<string>>(new Set());

    // Fetch gear options from the API on component mount
    useEffect(() => {
        const fetchGearOptions = async () => {
            const response = await axios.get('/api/gear-options');
            setGearOptions(response.data);
        };
        fetchGearOptions();
    }, []);

    // Toggle the selection of gears
    const toggleGearSelection = (id: string) => {
        setSelectedGears(prev => {
            const newSelection = new Set(prev);
            if (newSelection.has(id)) {
                newSelection.delete(id);
            } else {
                newSelection.add(id);
            }
            return newSelection;
        });
    };

    // Compare selected gear options
    const compareGears = async () => {
        if (selectedGears.size === 0) {
            alert('Please select at least one gear to compare.');
            return;
        }
        const gearIds = Array.from(selectedGears);
        const response = await axios.post('/api/compare-gears', { gearIds });
        console.log(response.data); // Handle comparison results
    };

    return (
        <div>
            <h1>Select Gear Options</h1>
            <div>
                {gearOptions.map(gear => (
                    <div key={gear.id}>
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedGears.has(gear.id)}
                                onChange={() => toggleGearSelection(gear.id)}
                            />
                            {gear.name} - {gear.description}
                        </label>
                    </div>
                ))}
            </div>
            <button onClick={compareGears}>Compare Selected Gears</button>
        </div>
    );
};

export default GearSelectionComponent;