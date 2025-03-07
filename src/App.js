import React, { useEffect, useState } from 'react';

const App = () => {
    const [users, setUsers] = useState([]);
    const [recordings, setRecordings] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [reports, setReports] = useState([]);

    // Fetch Users
    const fetchUsers = async () => {
        const response = await fetch('/users');
        const data = await response.json();
        setUsers(data);
    };

    // Fetch Recordings
    const fetchRecordings = async () => {
        const response = await fetch('/recordings');
        const data = await response.json();
        setRecordings(data);
    };

    // Fetch Recommendations
    const fetchRecommendations = async () => {
        const response = await fetch('/recommendations');
        const data = await response.json();
        setRecommendations(data);
    };

    // Fetch Notifications
    const fetchNotifications = async (userId) => {
        const response = await fetch(`/notifications/?user_id=${userId}`);
        const data = await response.json();
        setNotifications(data);
    };

    // Fetch Reports
    const fetchReports = async () => {
        const response = await fetch('/reports');
        const data = await response.json();
        setReports(data);
    };

    useEffect(() => {
        fetchUsers();
        fetchRecordings();
        fetchRecommendations();
        fetchReports();
        // Assuming userId is known for fetching notifications
        fetchNotifications(1); // Replace with actual userId
    }, []);

    return (
        <div>
            <h1>Users</h1>
            <pre>{JSON.stringify(users, null, 2)}</pre>
            <h1>Recordings</h1>
            <pre>{JSON.stringify(recordings, null, 2)}</pre>
            <h1>Recommendations</h1>
            <pre>{JSON.stringify(recommendations, null, 2)}</pre>
            <h1>Notifications</h1>
            <pre>{JSON.stringify(notifications, null, 2)}</pre>
            <h1>Reports</h1>
            <pre>{JSON.stringify(reports, null, 2)}</pre>
        </div>
    );
};

export default App;

// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserService from './components/UserService';
import RecordingService from './components/RecordingService';
import AnalysisService from './components/AnalysisService';
import RecommendationList from './components/RecommendationList';
import NotificationList from './components/NotificationList';
import ReportingService from './components/ReportingService';
import './App.css';

/**
 * Main application component that sets up routing for the application.
 */
const App = () => {
    return (
        <Router>
            <div className="app">
                <h1>E-Sports Analysis System</h1>
                <Switch>
                    <Route path="/users" component={UserService} />
                    <Route path="/recordings" component={RecordingService} />
                    <Route path="/analysis" component={AnalysisService} />
                    <Route path="/recommendations" component={RecommendationList} />
                    <Route path="/notifications" component={NotificationList} />
                    <Route path="/reports" component={ReportingService} />
                    <Route path="/" exact>
                        <h2>Welcome to the E-Sports Analysis System</h2>
                        <p>Select a service from the menu.</p>
                    </Route>
                    <Route>
                        <h2>404 Not Found</h2>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default App;