import React from 'react';
import './NotificationItem.css';

/**
 * NotificationItem component displays a single notification.
 */
const NotificationItem = ({ notification }) => {
    return (
        <li className="notification-item">
            <div className="notification-message">{notification.message}</div>
            <div className="notification-timestamp">{new Date(notification.timestamp).toLocaleString()}</div>
        </li>
    );
};

export default NotificationItem;