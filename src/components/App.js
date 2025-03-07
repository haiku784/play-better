import React, { useEffect, useState } from 'react';

const App = () => {
    const [users, setUsers] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [recommendations, setRecommendations] = useState([]);

    // Fetch users
    const fetchUsers = async () => {
        const response = await fetch('/users/');
        const data = await response.json();
        setUsers(data);
    };

    // Fetch sessions
    const fetchSessions = async () => {
        const response = await fetch('/sessions/');
        const data = await response.json();
        setSessions(data);
    };

    // Fetch notifications
    const fetchNotifications = async (userId) => {
        const response = await fetch(`/notifications/?user_id=${userId}`);
        const data = await response.json();
        setNotifications(data);
    };

    // Fetch recommendations
    const fetchRecommendations = async (userId) => {
        const response = await fetch(`/recommendations/?user_id=${userId}`);
        const data = await response.json();
        setRecommendations(data);
    };

    useEffect(() => {
        fetchUsers();
        fetchSessions();
        if (users.length > 0) {
            fetchNotifications(users[0].id);
            fetchRecommendations(users[0].id);
        }
    }, [users]);

    const createUser = async (userData) => {
        await fetch('/users/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userData),
        });
        fetchUsers();
    };

    const updateUser = async (userId, userData) => {
        await fetch(`/users/${userId}/`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userData),
        });
        fetchUsers();
    };

    const deleteUser = async (userId) => {
        await fetch(`/users/${userId}/`, {
            method: 'DELETE',
        });
        fetchUsers();
    };

    const createSession = async (sessionData) => {
        await fetch('/sessions/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(sessionData),
        });
        fetchSessions();
    };

    const stopSession = async (sessionId) => {
        await fetch(`/sessions/${sessionId}/stop`, {
            method: 'POST',
        });
        fetchSessions();
    };

    const createNotification = async (notificationData) => {
        await fetch('/notifications/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(notificationData),
        });
        fetchNotifications(users[0].id);
    };

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map(user => <li key={user.id}>{user.name}</li>)}
            </ul>
            <h1>Sessions</h1>
            <ul>
                {sessions.map(session => <li key={session.id}>{session.title}</li>)}
            </ul>
            <h1>Notifications</h1>
            <ul>
                {notifications.map(notification => <li key={notification.id}>{notification.message}</li>)}
            </ul>
            <h1>Recommendations</h1>
            <ul>
                {recommendations.map(rec => <li key={rec.id}>{rec.title}</li>)}
            </ul>
        </div>
    );
};

export default App;

import React, { useEffect, useState } from 'react';
import './App.css'; // Importing CSS for styling

/**
 * App component serves as the main entry point for the application.
 * It fetches and displays users, gameplay sessions, notifications, and recommendations.
 */
const App = () => {
    const [users, setUsers] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [recommendations, setRecommendations] = useState([]);

    /**
     * Fetch users from the User Management Service.
     */
    const fetchUsers = async () => {
        const response = await fetch('/api/users/');
        const data = await response.json();
        setUsers(data);
    };

    /**
     * Fetch gameplay sessions from the Recording Service.
     */
    const fetchSessions = async () => {
        const response = await fetch('/api/sessions/');
        const data = await response.json();
        setSessions(data);
    };

    /**
     * Fetch notifications for a specific user.
     * @param {number} userId - The ID of the user to fetch notifications for.
     */
    const fetchNotifications = async (userId) => {
        const response = await fetch(`/api/notifications/?user_id=${userId}`);
        const data = await response.json();
        setNotifications(data);
    };

    /**
     * Fetch recommendations for a specific user.
     * @param {number} userId - The ID of the user to fetch recommendations for.
     */
    const fetchRecommendations = async (userId) => {
        const response = await fetch(`/api/recommendations/?user_id=${userId}`);
        const data = await response.json();
        setRecommendations(data);
    };

    /**
     * useEffect hook to fetch data when the component mounts.
     */
    useEffect(() => {
        fetchUsers();
        fetchSessions();
        if (users.length > 0) {
            fetchNotifications(users[0].id);
            fetchRecommendations(users[0].id);
        }
    }, [users]);

    /**
     * Render the UI components.
     */
    return (
        <div className="app-container">
            <h1>Users</h1>
            <ul className="user-list">
                {users.map(user => <li key={user.id}>{user.username}</li>)}
            </ul>
            <h1>Sessions</h1>
            <ul className="session-list">
                {sessions.map(session => <li key={session.id}>{session.title}</li>)}
            </ul>
            <h1>Notifications</h1>
            <ul className="notification-list">
                {notifications.map(notification => <li key={notification.id}>{notification.message}</li>)}
            </ul>
            <h1>Recommendations</h1>
            <ul className="recommendation-list">
                {recommendations.map(rec => <li key={rec.id}>{rec.title}</li>)}
            </ul>
        </div>
    );
};

export default App;