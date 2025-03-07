import React, { useEffect, useState } from 'react';
import './UserManagement.css'; // Importing CSS for styling

/**
 * UserManagement component handles user-related operations such as listing,
 * creating, updating, and deleting users.
 */
const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [userData, setUserData] = useState({ name: '', email: '' }); // State for new user data
    const [editingUserId, setEditingUserId] = useState(null); // State for tracking which user is being edited

    /**
     * Fetches the list of users from the User Management Service.
     */
    const fetchUsers = async () => {
        const response = await fetch('/users/');
        const data = await response.json();
        setUsers(data);
    };

    /**
     * Handles the creation of a new user.
     * @param {Object} userData - The data for the new user.
     */
    const createUser = async (userData) => {
        await fetch('/users/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userData),
        });
        fetchUsers(); // Refresh user list after creation
    };

    /**
     * Handles the update of an existing user.
     * @param {number} userId - The ID of the user to update.
     * @param {Object} userData - The updated user data.
     */
    const updateUser = async (userId, userData) => {
        await fetch(`/users/${userId}/`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userData),
        });
        fetchUsers(); // Refresh user list after update
        setEditingUserId(null); // Reset editing state
    };

    /**
     * Handles the deletion of a user.
     * @param {number} userId - The ID of the user to delete.
     */
    const deleteUser = async (userId) => {
        await fetch(`/users/${userId}/`, {
            method: 'DELETE',
        });
        fetchUsers(); // Refresh user list after deletion
    };

    /**
     * Handles form submission for creating or updating a user.
     * @param {Event} e - The form submission event.
     */
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        if (editingUserId) {
            updateUser(editingUserId, userData);
        } else {
            createUser(userData);
        }
        setUserData({ name: '', email: '' }); // Reset form fields
    };

    /**
     * Handles input changes in the form.
     * @param {Event} e - The input change event.
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    /**
     * Handles editing a user by setting the user data in the form.
     * @param {Object} user - The user object to edit.
     */
    const handleEdit = (user) => {
        setUserData({ name: user.name, email: user.email });
        setEditingUserId(user.id);
    };

    useEffect(() => {
        fetchUsers(); // Fetch users on component mount
    }, []);

    return (
        <div className="user-management">
            <h1>User Management</h1>
            <form onSubmit={handleSubmit} className="user-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={userData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={userData.email}
                    onChange={handleChange}
                    required
                />
                <button type="submit">{editingUserId ? 'Update User' : 'Create User'}</button>
            </form>
            <ul className="user-list">
                {users.map(user => (
                    <li key={user.id} className="user-item">
                        <span>{user.name} ({user.email})</span>
                        <button onClick={() => handleEdit(user)}>Edit</button>
                        <button onClick={() => deleteUser(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserManagement;