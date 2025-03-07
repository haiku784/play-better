import React, { useEffect, useState } from 'react';

const App = () => {
  const [recordings, setRecordings] = useState([]);
  const [performanceMetrics, setPerformanceMetrics] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [users, setUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Fetch recordings
  const fetchRecordings = async () => {
    const response = await fetch('/recordings/');
    const data = await response.json();
    setRecordings(data);
  };

  // Fetch performance metrics
  const fetchPerformanceMetrics = async () => {
    const response = await fetch('/performance-metrics/');
    const data = await response.json();
    setPerformanceMetrics(data);
  };

  // Fetch recommendations
  const fetchRecommendations = async () => {
    const response = await fetch('/recommendations');
    const data = await response.json();
    setRecommendations(data);
  };

  // Fetch users
  const fetchUsers = async () => {
    const response = await fetch('/users/');
    const data = await response.json();
    setUsers(data);
  };

  // Fetch notifications
  const fetchNotifications = async () => {
    const response = await fetch('/notifications/');
    const data = await response.json();
    setNotifications(data);
  };

  useEffect(() => {
    fetchRecordings();
    fetchPerformanceMetrics();
    fetchRecommendations();
    fetchUsers();
    fetchNotifications();
  }, []);

  return (
    <div>
      <h1>Recordings</h1>
      <pre>{JSON.stringify(recordings, null, 2)}</pre>
      <h1>Performance Metrics</h1>
      <pre>{JSON.stringify(performanceMetrics, null, 2)}</pre>
      <h1>Recommendations</h1>
      <pre>{JSON.stringify(recommendations, null, 2)}</pre>
      <h1>Users</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>
      <h1>Notifications</h1>
      <pre>{JSON.stringify(notifications, null, 2)}</pre>
    </div>
  );
};

export default App;

// src/App.js
import React from 'react';
import RecordingList from './components/RecordingList';
import PerformanceMetrics from './components/PerformanceMetrics';
import Recommendations from './components/Recommendations';
import UserProfile from './components/UserProfile';
import NotificationList from './components/NotificationList';
import './App.css';

/**
 * Main App component that renders all other components.
 */
const App = () => {
  return (
    <div className="app">
      <h1>E-Sports Application</h1>
      <RecordingList />
      <PerformanceMetrics />
      <Recommendations />
      <UserProfile />
      <NotificationList />
    </div>
  );
};

export default App;


// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RecordingList from './components/RecordingList';
import PerformanceMetrics from './components/PerformanceMetrics';
import Recommendations from './components/Recommendations';
import UserProfile from './components/UserProfile';
import NotificationList from './components/NotificationList';
import NotFound from './components/NotFound';
import './App.css';

/**
 * Main App component that sets up routing for the application.
 */
const App = () => {
  return (
    <Router>
      <div className="app">
        <h1>E-Sports Application</h1>
        <Switch>
          <Route path="/recordings" component={RecordingList} />
          <Route path="/performance-metrics" component={PerformanceMetrics} />
          <Route path="/recommendations" component={Recommendations} />
          <Route path="/user-profile" component={UserProfile} />
          <Route path="/notifications" component={NotificationList} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;

// src/App.js
import React from 'react';
import './global.css';
import RecordingList from './components/RecordingList';
import PerformanceMetrics from './components/PerformanceMetrics';
import Recommendations from './components/Recommendations';
import UserProfile from './components/UserProfile';
import NotificationList from './components/NotificationList';

/**
 * Main App component that renders all other components.
 */
const App = () => {
  return (
    <div className="container">
      <h1>E-Sports Application</h1>
      <RecordingList />
      <PerformanceMetrics />
      <Recommendations />
      <UserProfile />
      <NotificationList />
    </div>
  );
};

export default App;