// src/components/UserProfile.js
import React, { useEffect, useState } from 'react';
import './UserProfile.css';

/**
 * UserProfile component fetches and displays user profile information.
 * It allows users to update their profile details.
 */
const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch user profile data from the User Service.
   */
  const fetchUserProfile = async () => {
    try {
      const response = await fetch('/users/profile');
      if (!response.ok) throw new Error('Failed to fetch user profile');
      const data = await response.json();
      setUser(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update user profile data.
   * @param {Object} updatedUser - The updated user data.
   */
  const updateUserProfile = async (updatedUser) => {
    try {
      const response = await fetch('/users/profile', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(updatedUser),
      });
      if (!response.ok) throw new Error('Failed to update user profile');
      fetchUserProfile(); // Refresh user data after update
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        const updatedUser = { name: e.target.name.value, email: e.target.email.value };
        updateUserProfile(updatedUser);
      }}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" defaultValue={user.name} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" defaultValue={user.email} required />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UserProfile;

// src/components/UserProfile.js
import React, { useEffect, useState } from 'react';
import './UserProfile.css';

/**
 * UserProfile component fetches and displays user profile information.
 * It communicates with the Gateway Service to retrieve user data.
 */
const UserProfile = () => {
  const [user, setUser] = useState(null);

  /**
   * Fetch user profile from the Gateway Service.
   */
  const fetchUserProfile = async () => {
    try {
      const response = await fetch('/users/profile');
      if (!response.ok) throw new Error('Failed to fetch user profile');
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Preferences: {user.preferences.join(', ')}</p>
        </div>
      ) : (
        <p>No user profile available.</p>
      )}
    </div>
  );
};

export default UserProfile;
