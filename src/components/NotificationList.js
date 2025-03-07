// src/components/NotificationList.js
import React, { useEffect, useState } from 'react';
import './NotificationList.css';

/**
 * NotificationList component fetches and displays notifications for the user.
 * It handles data fetching, rendering, and basic styling.
 */
const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch notifications from the Notification Service API.
   */
  const fetchNotifications = async () => {
    try {
      const response = await fetch('/notifications/');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (loading) return <div className="loading">Loading notifications...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="notification-list">
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id} className="notification-item">
            <p>{notification.message}</p>
            <span className="notification-timestamp">{new Date(notification.timestamp).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationList;

// src/components/NotificationList.js
import React, { useEffect, useState } from 'react';
import './NotificationList.css';

/**
 * NotificationList component fetches and displays notifications for the user.
 * It communicates with the Gateway Service to retrieve notification data.
 */
const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);

  /**
   * Fetch notifications from the Gateway Service.
   */
  const fetchNotifications = async () => {
    try {
      const response = await fetch('/notifications/');
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
    <div className="notification-list">
      <h2>Notifications</h2>
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id}>{notification.message}</li>
          ))}
        </ul>
      ) : (
        <p>No notifications available.</p>
      )}
    </div>
  );
};

export default NotificationList;
