import React, { useEffect, useState } from 'react';
import NotificationItem from './NotificationItem';
import './NotificationList.css';

/**
 * NotificationList component fetches and displays a list of notifications for a user.
 * It handles fetching notifications from the Notification Service API and rendering them.
 */
const NotificationList = ({ userId }) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /**
     * Fetch notifications from the API for the given userId.
     */
    const fetchNotifications = async () => {
        try {
            const response = await fetch(`/notifications?user_id=${userId}`);
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

    if (loading) return <div>Loading notifications...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="notification-list">
            <h2>Your Notifications</h2>
            {notifications.length === 0 ? (
                <p>No notifications available.</p>
            ) : (
                <ul>
                    {notifications.map(notification => (
                        <NotificationItem key={notification.notificationId} notification={notification} />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default NotificationList;