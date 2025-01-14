import React, { useEffect, useState } from 'react';
import { Highlight } from '../types';
import axios from 'axios';

const Highlights: React.FC = () => {
    const [highlights, setHighlights] = useState<Highlight[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [filterType, setFilterType] = useState<string>('all');
    const [filterDate, setFilterDate] = useState<string>('');

    // Fetch highlights from the backend API
    useEffect(() => {
        const fetchHighlights = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/api/highlights');
                setHighlights(response.data);
            } catch (err) {
                setError('Failed to fetch highlights');
            } finally {
                setLoading(false);
            }
        };
        fetchHighlights();
    }, []);

    // Filter highlights based on type and date
    const filteredHighlights = highlights.filter(highlight => {
        const matchesType = filterType === 'all' || highlight.type === filterType;
        const matchesDate = filterDate ? new Date(highlight.date).toDateString() === new Date(filterDate).toDateString() : true;
        return matchesType && matchesDate;
    });

    return (
        <div>
            {loading && <p>Loading highlights...</p>}
            {error && <p>{error}</p>}
            <div>
                <h2>Gameplay Highlights</h2>
                <label htmlFor="filterType">Filter by Type:</label>
                <select id="filterType" onChange={e => setFilterType(e.target.value)}>
                    <option value="all">All</option>
                    <option value="goal">Goals</option>
                    <option value="assist">Assists</option>
                    <option value="save">Saves</option>
                </select>
                <label htmlFor="filterDate">Filter by Date:</label>
                <input type="date" id="filterDate" onChange={e => setFilterDate(e.target.value)} />
            </div>
            <ul>
                {filteredHighlights.map(highlight => (
                    <li key={highlight.id}>{highlight.description} - {highlight.date}</li>
                ))}
            </ul>
        </div>
    );
};

export default Highlights;