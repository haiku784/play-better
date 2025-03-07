// src/components/UserService.js
import React, { useEffect, useState } from 'react';
import './UserService.css'; // Importing CSS for styling

/**
 * UserService component handles user-related functionalities such as fetching user data,
 * displaying user profiles, and updating user preferences.
 */
const UserService = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /**
     * Fetches the list of users from the User Service API.
     */
    const fetchUsers = async () => {
        try {
            const response = await fetch('/users');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Fetches user data when the component mounts.
     */
    useEffect(() => {
        fetchUsers();
    }, []);

    /**
     * Renders the user list or loading/error messages.
     */
    return (
        <div className="user-service">
            <h1>User Profiles</h1>
            {loading && <p>Loading...</p>}
            {error && <p className="error">Error: {error}</p>}
            <ul className="user-list">
                {users.map(user => (
                    <li key={user.userId} className="user-item">
                        <h2>{user.username}</h2>
                        <p>Email: {user.email}</p>
                        <p>Preferences: {JSON.stringify(user.preferences)}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserService;