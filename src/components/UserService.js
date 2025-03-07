import React, { useEffect, useState } from 'react';
import './UserService.css';

/**
 * UserService component handles user-related operations such as fetching,
 * creating, updating, and deleting users. It displays user data in a
 * structured format and allows user interactions.
 */
const UserService = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch users from the User Service API.
   */
  const fetchUsers = async () => {
    try {
      const response = await fetch('/users/');
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Create a new user in the User Service API.
   * @param {Object} user - User data to be created.
   */
  const createUser = async (user) => {
    try {
      const response = await fetch('/users/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      if (!response.ok) throw new Error('Failed to create user');
      fetchUsers(); // Refresh user list after creation
    } catch (err) {
      setError(err.message);
    }
  };

  /**
   * Delete a user by ID from the User Service API.
   * @param {string} id - ID of the user to be deleted.
   */
  const deleteUser = async (id) => {
    try {
      const response = await fetch(`/users/${id}/`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete user');
      fetchUsers(); // Refresh user list after deletion
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="user-service">
      <h1>User Management</h1>
      {loading && <p>Loading users...</p>}
      {error && <p className="error">Error: {error}</p>}
      <ul className="user-list">
        {users.map(user => (
          <li key={user.userId} className="user-item">
            <span>{user.username}</span>
            <button onClick={() => deleteUser(user.userId)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={() => createUser({ username: 'NewUser' })}>Add User</button>
    </div>
  );
};

export default UserService;