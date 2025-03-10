import React, { useEffect, useState } from 'react';
import './UserManagement.css'; // Importing CSS for styling

/**
 * UserManagement component handles the user management functionalities.
 * It allows creating, updating, deleting, and listing users.
 */
const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({ name: '', email: '', role: '' });
    const [editingUserId, setEditingUserId] = useState(null);
    const API_URL = 'http://localhost:5000/users'; // API endpoint

    /**
     * Fetch all users from the API.
     */
    const fetchUsers = async () => {
        const response = await fetch(API_URL);
        const data = await response.json();
        setUsers(data);
    };

    /**
     * Create or update a user based on the editing state.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingUserId) {
            // Update user
            await fetch(`${API_URL}/${editingUserId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });
        } else {
            // Create new user
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });
        }
        setUser({ name: '', email: '', role: '' }); // Reset form
        setEditingUserId(null); // Reset editing state
        fetchUsers(); // Refresh user list
    };

    /**
     * Handle user deletion.
     */
    const handleDelete = async (userId) => {
        await fetch(`${API_URL}/${userId}`, {
            method: 'DELETE',
        });
        fetchUsers(); // Refresh user list
    };

    /**
     * Handle editing a user.
     */
    const handleEdit = (user) => {
        setUser(user);
        setEditingUserId(user.id);
    };

    useEffect(() => {
        fetchUsers(); // Fetch users on component mount
    }, []);

    return (
        <div className="user-management">
            <h2>User Management</h2>
            <form onSubmit={handleSubmit} className="user-form">
                <input
                    type="text"
                    placeholder="Name"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Role"
                    value={user.role}
                    onChange={(e) => setUser({ ...user, role: e.target.value })}
                    required
                />
                <button type="submit">{editingUserId ? 'Update User' : 'Create User'}</button>
            </form>
            <ul className="user-list">
                {users.map((user) => (
                    <li key={user.id} className="user-item">
                        {user.name} ({user.email}) - {user.role}
                        <button onClick={() => handleEdit(user)}>Edit</button>
                        <button onClick={() => handleDelete(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserManagement;