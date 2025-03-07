import React, { useState, useEffect } from 'react';
import './NotificationService.css';

/**
 * NotificationService Component
 * This component handles the display and management of user notifications.
 */
const NotificationService = () => {
  const [notifications, setNotifications] = useState([]);

  /**
   * Fetch notifications for the user from the backend.
   * This function is called when the component mounts.
   */
  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await fetch('/notifications/1/'); // Assuming userId is 1 for demo
      const data = await response.json();
      setNotifications(data);
    };
    fetchNotifications();
  }, []);

  /**
   * Marks a notification as read by sending a request to the backend.
   * @param {number} notificationId - The ID of the notification to mark as read.
   */
  const markAsRead = async (notificationId) => {
    await fetch(`/notifications/${notificationId}/read/`, { method: 'PUT' });
    // Update local state to reflect the change
    setNotifications(notifications.filter(n => n.id !== notificationId));
  };

  return (
    <div className="notification-service">
      <h2>User Notifications</h2>
      <ul className="notification-list">
        {notifications.map(notification => (
          <li key={notification.id} className="notification-item">
            <p>{notification.message}</p>
            <button onClick={() => markAsRead(notification.id)}>Mark as Read</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationService;