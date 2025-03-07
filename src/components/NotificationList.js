// src/components/NotificationList.js
import React, { useEffect, useState } from 'react';
import './NotificationList.css';

/**
 * NotificationList component fetches and displays a list of notifications for a user.
 * It handles data fetching, loading states, and error handling.
 */
const NotificationList = ({ userId }) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /**
     * Fetch notifications from the Notification Service API.
     */
    const fetchNotifications = async () => {
        try {
            const response = await fetch(`/notifications/?user_id=${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch notifications');
            }
            const data = await response.json();
            setNotifications(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, [userId]);

    if (loading) return <div className="loading">Loading notifications...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="notification-list">
            <h2>Notifications</h2>
            <ul>
                {notifications.map((notification) => (
                    <li key={notification.notificationId} className="notification-item">
                        <p>{notification.message}</p>
                        <span>{new Date(notification.timestamp).toLocaleString()}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationList;