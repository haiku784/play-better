import React, { useEffect, useState } from 'react';
import './NotificationService.css';

/**
 * NotificationService component fetches and displays notifications for users.
 * It allows users to view their notifications in a structured format.
 */
const NotificationService = ({ userId }) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /**
     * Fetch notifications for the given user ID.
     */
    const fetchNotifications = async () => {
        try {
            setLoading(true);
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
        if (userId) {
            fetchNotifications();
        }
    }, [userId]);

    /**
     * Renders the notifications list.
     */
    const renderNotifications = () => {
        if (loading) {
            return <p>Loading notifications...</p>;
        }
        if (error) {
            return <p className="error">Error: {error}</p>;
        }
        if (notifications.length === 0) {
            return <p>No notifications available.</p>;
        }
        return (
            <ul className="notification-list">
                {notifications.map(notification => (
                    <li key={notification.id} className="notification-item">
                        <span className="notification-message">{notification.message}</span>
                        <span className="notification-date">{new Date(notification.date).toLocaleString()}</span>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="notification-service">
            <h2>User Notifications</h2>
            {renderNotifications()}
        </div>
    );
};

export default NotificationService;
