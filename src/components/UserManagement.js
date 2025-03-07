import React, { useState, useEffect } from 'react';
import './UserManagement.css'; // Importing CSS for styling

/**
 * UserManagement component handles user-related operations such as creating,
 * updating, deleting, and fetching user information.
 */
const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');

  /**
   * Fetches all users from the User Management Service.
   */
  const fetchUsers = async () => {
    const response = await fetch('/users/');
    const data = await response.json();
    setUsers(data);
  };

  /**
   * Handles user creation.
   */
  const createUser = async () => {
    await fetch('/users/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: userName }),
    });
    fetchUsers(); // Refresh user list after creation
  };

  /**
   * Handles user update.
   */
  const updateUser = async () => {
    await fetch(`/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: userName }),
    });
    fetchUsers(); // Refresh user list after update
  };

  /**
   * Handles user deletion.
   */
  const deleteUser = async (id) => {
    await fetch(`/users/${id}`, { method: 'DELETE' });
    fetchUsers(); // Refresh user list after deletion
  };

  /**
   * Effect to fetch users on component mount.
   */
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="user-management">
      <h2>User Management</h2>
      <div className="user-form">
        <input
          type="text"
          placeholder="User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button onClick={createUser}>Create User</button>
        <button onClick={updateUser} disabled={!userId}>Update User</button>
      </div>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.userId} className="user-item">
            {user.username}
            <button onClick={() => { setUserId(user.userId); setUserName(user.username); }}>Edit</button>
            <button onClick={() => deleteUser(user.userId)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;