import React from 'react';

interface FilterProps {
    onChange: (filters: object) => void;
}

const Filter: React.FC<FilterProps> = ({ onChange }) => {
    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // Logic for handling filter changes and calling onChange with filter values
        const selectedFilter = e.target.value;
        onChange({ selectedFilter });
    };

    return (
        <div>
            <label htmlFor="filter">Filter by KPI:</label>
            <select id="filter" onChange={handleFilterChange}>
                <option value="all">All</option>
                <option value="kills">Kills</option>
                <option value="deaths">Deaths</option>
                <option value="completionRate">Completion Rate</option>
            </select>
        </div>
    );
};

export default Filter;