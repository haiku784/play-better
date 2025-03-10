import React, { useEffect, useState } from 'react';
import './NotificationService.css';

/**
 * NotificationService component to manage and display user notifications.
 * It fetches notifications from the Notification Service API and displays them in a list.
 */
const NotificationService = () => {
    const [notifications, setNotifications] = useState([]);
    const API_URL = 'http://localhost:5000/notifications'; // Replace with your API URL

    /**
     * Fetch notifications from the Notification Service API.
     */
    const fetchNotifications = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Failed to fetch notifications');
            const data = await response.json();
            setNotifications(data);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    return (
        <div className="notification-container">
            <h2>User Notifications</h2>
            <ul className="notification-list">
                {notifications.length > 0 ? (
                    notifications.map(notification => (
                        <li key={notification.id} className="notification-item">
                            <span className="notification-message">{notification.message}</span>
                            <span className="notification-timestamp">{new Date(notification.timestamp).toLocaleString()}</span>
                        </li>
                    ))
                ) : (
                    <li>No notifications available.</li>
                )}
            </ul>
        </div>
    );
};

export default NotificationService;