import React, { useState, useEffect } from 'react';
import './UserManagement.css';

/**
 * UserManagement component handles user registration, login, and profile management.
 * It fetches user data and allows users to update their preferences.
 */
const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [userPreferences, setUserPreferences] = useState({});
    const [newUser, setNewUser] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    /**
     * Fetches the list of users from the User Management Service.
     */
    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/users/');
            const data = await response.json();
            setUsers(data);
        } catch (err) {
            setError('Failed to fetch users.');
        }
    };

    /**
     * Handles user registration by sending a POST request to the User Management Service.
     */
    const handleRegister = async () => {
        try {
            const response = await fetch('/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser),
            });
            if (!response.ok) throw new Error('Registration failed');
            const data = await response.json();
            alert(`User registered: ${data.username}`);
            fetchUsers(); // Refresh user list
        } catch (err) {
            setError(err.message);
        }
    };

    /**
     * Fetches user preferences for the logged-in user.
     */
    const fetchUserPreferences = async () => {
        try {
            const response = await fetch('/api/user-preferences/');
            const data = await response.json();
            setUserPreferences(data);
        } catch (err) {
            setError('Failed to fetch user preferences.');
        }
    };

    /**
     * Updates user preferences by sending a PUT request to the User Management Service.
     */
    const handleUpdatePreferences = async () => {
        try {
            const response = await fetch('/api/user-preferences/', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userPreferences),
            });
            if (!response.ok) throw new Error('Update failed');
            alert('Preferences updated successfully!');
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchUserPreferences();
    }, []);

    return (
        <div className="user-management">
            <h1>User Management</h1>
            {error && <p className="error">{error}</p>}
            <h2>Register New User</h2>
            <input
                type="text"
                placeholder="Username"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            />
            <button onClick={handleRegister}>Register</button>
            <h2>Users List</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.userId}>{user.username}</li>
                ))}
            </ul>
            <h2>User Preferences</h2>
            <textarea
                value={JSON.stringify(userPreferences, null, 2)}
                onChange={(e) => setUserPreferences(JSON.parse(e.target.value))}
            />
            <button onClick={handleUpdatePreferences}>Update Preferences</button>
        </div>
    );
};

export default UserManagement;