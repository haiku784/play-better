import React, { useState, useEffect } from 'react';

const App = () => {
    const [performanceMetrics, setPerformanceMetrics] = useState([]);
    const [gameplaySessions, setGameplaySessions] = useState([]);
    const [userPreferences, setUserPreferences] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [users, setUsers] = useState([]);
    const [notifications, setNotifications] = useState([]);

    const startRecording = async () => {
        const response = await fetch('/recording/start/', { method: 'POST' });
        const data = await response.json();
        console.log('Recording started:', data);
    };

    const stopRecording = async (sessionId) => {
        const response = await fetch(`/recording/stop/${sessionId}/`, { method: 'POST' });
        const data = await response.json();
        console.log('Recording stopped:', data);
    };

    const fetchPerformanceMetrics = async () => {
        const response = await fetch('/performance-metrics/');
        const data = await response.json();
        setPerformanceMetrics(data);
    };

    const fetchGameplaySessions = async () => {
        const response = await fetch('/gameplay-sessions/');
        const data = await response.json();
        setGameplaySessions(data);
    };

    const fetchUserPreferences = async () => {
        const response = await fetch('/user-preferences/');
        const data = await response.json();
        setUserPreferences(data);
    };

    const fetchRecommendations = async () => {
        const response = await fetch('/recommendations/');
        const data = await response.json();
        setRecommendations(data);
    };

    const fetchUsers = async () => {
        const response = await fetch('/api/users/');
        const data = await response.json();
        setUsers(data);
    };

    const fetchNotifications = async (userId) => {
        const response = await fetch(`/notifications?user_id=${userId}`);
        const data = await response.json();
        setNotifications(data);
    };

    useEffect(() => {
        fetchPerformanceMetrics();
        fetchGameplaySessions();
        fetchUserPreferences();
        fetchRecommendations();
        fetchUsers();
        // Example userId for notifications
        fetchNotifications(1);
    }, []);

    return (
        <div>
            <h1>API Calls Example</h1>
            <button onClick={startRecording}>Start Recording</button>
            <button onClick={() => stopRecording(1)}>Stop Recording</button>
            <h2>Performance Metrics</h2>
            <pre>{JSON.stringify(performanceMetrics, null, 2)}</pre>
            <h2>Gameplay Sessions</h2>
            <pre>{JSON.stringify(gameplaySessions, null, 2)}</pre>
            <h2>User Preferences</h2>
            <pre>{JSON.stringify(userPreferences, null, 2)}</pre>
            <h2>Recommendations</h2>
            <pre>{JSON.stringify(recommendations, null, 2)}</pre>
            <h2>Users</h2>
            <pre>{JSON.stringify(users, null, 2)}</pre>
            <h2>Notifications</h2>
            <pre>{JSON.stringify(notifications, null, 2)}</pre>
        </div>
    );
};

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RecordingService from './components/RecordingService';
import Analysis from './components/Analysis';
import RecommendationComponent from './components/RecommendationComponent';
import UserManagement from './components/UserManagement';
import NotificationList from './components/NotificationList';
import NotFound from './components/NotFound';

/**
 * App component serves as the main entry point for the application.
 * It sets up routing for different components of the e-sports ecosystem.
 */
const App = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/recording" component={RecordingService} />
                    <Route path="/analysis" component={Analysis} />
                    <Route path="/recommendations" component={RecommendationComponent} />
                    <Route path="/user-management" component={UserManagement} />
                    <Route path="/notifications" component={NotificationList} />
                    <Route path="*" component={NotFound} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;