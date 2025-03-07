import React, { useEffect, useState } from 'react';
import './NotificationService.css';

/**
 * NotificationService component handles the display and management of user notifications.
 * It fetches notifications from the Notification Service API and allows users to delete notifications.
 */
const NotificationService = () => {
  const [notifications, setNotifications] = useState([]);

  /**
   * Fetch notifications for the user from the API.
   * This function is called when the component mounts.
   */
  const fetchNotifications = async () => {
    try {
      const response = await fetch('/notifications');
      if (!response.ok) throw new Error('Failed to fetch notifications');
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  /**
   * Delete a notification by its ID.
   * @param {string} id - The ID of the notification to delete.
   */
  const deleteNotification = async (id) => {
    try {
      await fetch(`/notifications/${id}`, { method: 'DELETE' });
      setNotifications(notifications.filter(notification => notification.id !== id));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="notification-service">
      <h2>User Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications available.</p>
      ) : (
        <ul>
          {notifications.map(notification => (
            <li key={notification.id} className="notification-item">
              <span>{notification.message}</span>
              <button onClick={() => deleteNotification(notification.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationService;