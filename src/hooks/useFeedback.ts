import { useState } from 'react';

const useFeedback = () => {
    const [notifications, setNotifications] = useState<{ message: string; type: string }[]>([]);

    const addNotification = (message: string, type: string) => {
        setNotifications((prev) => [...prev, { message, type }]);
    };

    const clearNotifications = () => {
        setNotifications([]);
    };

    return { notifications, addNotification, clearNotifications };
};

export default useFeedback;