import { useState } from 'react';

const useFeedback = () => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = (message, type) => {
        setNotifications(prev => [...prev, { message, type }]);
    };

    const clearNotifications = () => {
        setNotifications([]);
    };

    return { notifications, addNotification, clearNotifications };
};

export default useFeedback;