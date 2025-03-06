import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState('');
    const [userData, setUserData] = useState({ name: '', email: '' });

    // Fetch all users
    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/users/');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    // Create a new user
    const createUser = async () => {
        try {
            await axios.post('/api/users/', userData);
            fetchUsers(); // Refresh the user list
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    // Update an existing user
    const updateUser = async () => {
        try {
            await axios.put(`/api/users/${userId}/`, userData);
            fetchUsers(); // Refresh the user list
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    // Delete a user
    const deleteUser = async () => {
        try {
            await axios.delete(`/api/users/${userId}/`);
            fetchUsers(); // Refresh the user list
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h1>User Management</h1>
            <h2>Create User</h2>
            <input
                type="text"
                placeholder="Name"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            />
            <input
                type="email"
                placeholder="Email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            />
            <button onClick={createUser}>Create User</button>

            <h2>Update/Delete User</h2>
            <input
                type="text"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
            />
            <button onClick={updateUser}>Update User</button>
            <button onClick={deleteUser}>Delete User</button>

            <h2>User List</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name} - {user.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserManagement;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserManagement.css'; // Importing CSS for styling

/**
 * UserManagement component handles user registration, updating, and deletion.
 * It fetches user data from the User Management Service and displays it in a list.
 */
const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState('');
    const [userData, setUserData] = useState({ name: '', email: '' });

    /**
     * Fetch all users from the API.
     */
    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/users/');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    /**
     * Create a new user by sending a POST request to the API.
     */
    const createUser = async () => {
        try {
            await axios.post('/api/users/', userData);
            fetchUsers(); // Refresh the user list
            resetForm(); // Reset form after creation
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    /**
     * Update an existing user by sending a PUT request to the API.
     */
    const updateUser = async () => {
        try {
            await axios.put(`/api/users/${userId}/`, userData);
            fetchUsers(); // Refresh the user list
            resetForm(); // Reset form after update
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    /**
     * Delete a user by sending a DELETE request to the API.
     */
    const deleteUser = async () => {
        try {
            await axios.delete(`/api/users/${userId}/`);
            fetchUsers(); // Refresh the user list
            resetForm(); // Reset form after deletion
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    /**
     * Reset the user form fields.
     */
    const resetForm = () => {
        setUserId('');
        setUserData({ name: '', email: '' });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="user-management">
            <h1>User Management</h1>
            <div className="form-container">
                <h2>Create User</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                />
                <button onClick={createUser}>Create User</button>

                <h2>Update/Delete User</h2>
                <input
                    type="text"
                    placeholder="User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <button onClick={updateUser}>Update User</button>
                <button onClick={deleteUser}>Delete User</button>
            </div>

            <h2>User List</h2>
            <ul className="user-list">
                {users.map(user => (
                    <li key={user.id}>{user.name} - {user.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserManagement; 

/* UserManagement.css */
.user-management {
    font-family: Arial, sans-serif;
    margin: 20px;
}

.form-container {
    margin-bottom: 20px;
}

input {
    margin: 5px 0;
    padding: 10px;
    width: 200px;
}

button {
    margin: 5px;
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

.user-list {
    list-style-type: none;
    padding: 0;
} 

/* Unit Tests for UserManagement Component */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserManagement from './UserManagement';
import axios from 'axios';

jest.mock('axios');

describe('UserManagement Component', () => {
    beforeEach(() => {
        axios.get.mockResolvedValue({ data: [{ id: 1, name: 'John Doe', email: 'john@example.com' }] });
    });

    test('renders UserManagement component', async () => {
        render(<UserManagement />);
        const titleElement = screen.getByText(/User Management/i);
        expect(titleElement).toBeInTheDocument();
    });

    test('fetches and displays users', async () => {
        render(<UserManagement />);
        const userElement = await screen.findByText(/John Doe - john@example.com/i);
        expect(userElement).toBeInTheDocument();
    });

    test('creates a new user', async () => {
        render(<UserManagement />);
        const nameInput = screen.getByPlaceholderText(/Name/i);
        const emailInput = screen.getByPlaceholderText(/Email/i);
        const createButton = screen.getByText(/Create User/i);

        fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
        fireEvent.change(emailInput, { target: { value: 'jane@example.com' } });
        fireEvent.click(createButton);

        expect(axios.post).toHaveBeenCalledWith('/api/users/', { name: 'Jane Doe', email: 'jane@example.com' });
    });
});

/* Integration Tests for UserManagement Component */
import React from 'react';
import { render, screen } from '@testing-library/react';
import UserManagement from './UserManagement';
import axios from 'axios';

jest.mock('axios');

describe('UserManagement Integration Tests', () => {
    test('fetches users on mount', async () => {
        axios.get.mockResolvedValueOnce({ data: [{ id: 1, name: 'John Doe', email: 'john@example.com' }] });
        render(<UserManagement />);
        const userElement = await screen.findByText(/John Doe - john@example.com/i);
        expect(userElement).toBeInTheDocument();
    });
});

// Note: Ensure to run tests using a testing framework like Jest.