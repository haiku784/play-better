import React, { useState } from 'react';
import axios from 'axios';

interface GamingPreferences {
    favoriteGames: string;
    playStyle: string;
    budget: number;
}

const GamingPreferencesForm: React.FC = () => {
    const [preferences, setPreferences] = useState<GamingPreferences>({
        favoriteGames: '',
        playStyle: '',
        budget: 0
    });
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPreferences({ ...preferences, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Input validation
        if(!preferences.favoriteGames || !preferences.playStyle || preferences.budget <= 0) {
            setError('Please fill all fields and ensure budget is greater than zero.');
            return;
        }

        try {
            const response = await axios.post('/api/gaming-preferences', preferences);
            setSuccess('Preferences submitted successfully!');
        } catch (err) {
            setError('An error occurred while submitting preferences.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Favorite Game Titles:</label>
                <input type="text" name="favoriteGames" value={preferences.favoriteGames} onChange={handleChange} required />
            </div>
            <div>
                <label>Play Style:</label>
                <input type="text" name="playStyle" value={preferences.playStyle} onChange={handleChange} required />
            </div>
            <div>
                <label>Budget:</label>
                <input type="number" name="budget" value={preferences.budget} onChange={handleChange} required />
            </div>
            <button type="submit">Submit</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </form>
    );
};

export default GamingPreferencesForm;