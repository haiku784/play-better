import React, { useState, useEffect } from 'react';

const App = () => {
  const [sessionId, setSessionId] = useState(null);
  const [performanceMetrics, setPerformanceMetrics] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [users, setUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const startRecording = async () => {
    const response = await fetch('/recording/start', { method: 'POST' });
    const data = await response.json();
    setSessionId(data.session_id);
  };

  const getRecording = async (sessionId) => {
    const response = await fetch(`/recording/${sessionId}`);
    const data = await response.json();
    console.log(data);
  };

  const deleteRecording = async (sessionId) => {
    await fetch(`/recording/${sessionId}`, { method: 'DELETE' });
  };

  const postPerformanceMetrics = async (metrics) => {
    await fetch('/performance_metrics/', { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(metrics) 
    });
  };

  const getPerformanceMetrics = async () => {
    const response = await fetch('/performance_metrics/');
    const data = await response.json();
    setPerformanceMetrics(data);
  };

  const getPerformanceMetric = async (metricId) => {
    const response = await fetch(`/performance_metrics/${metricId}`);
    const data = await response.json();
    console.log(data);
  };

  const deletePerformanceMetric = async (metricId) => {
    await fetch(`/performance_metrics/${metricId}`, { method: 'DELETE' });
  };

  const postRecommendations = async (recommendation) => {
    await fetch('/recommendations/', { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(recommendation) 
    });
  };

  const getRecommendations = async (userId) => {
    const response = await fetch(`/recommendations/${userId}/`);
    const data = await response.json();
    setRecommendations(data);
  };

  const postUser = async (user) => {
    await fetch('/users/', { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(user) 
    });
  };

  const getUser = async (userId) => {
    const response = await fetch(`/users/${userId}`);
    const data = await response.json();
    console.log(data);
  };

  const updateUser = async (userId, user) => {
    await fetch(`/users/${userId}`, { 
      method: 'PUT', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(user) 
    });
  };

  const deleteUser = async (userId) => {
    await fetch(`/users/${userId}`, { method: 'DELETE' });
  };

  const postNotification = async (notification) => {
    await fetch('/notifications/', { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(notification) 
    });
  };

  const getNotifications = async (userId) => {
    const response = await fetch(`/notifications/${userId}/`);
    const data = await response.json();
    setNotifications(data);
  };

  const markNotificationAsRead = async (notificationId) => {
    await fetch(`/notifications/${notificationId}/read/`, { method: 'PUT' });
  };

  return (
    <div>
      <h1>API Interaction</h1>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={() => getRecording(sessionId)}>Get Recording</button>
      <button onClick={() => deleteRecording(sessionId)}>Delete Recording</button>
      <button onClick={getPerformanceMetrics}>Get Performance Metrics</button>
      <button onClick={() => getPerformanceMetric(1)}>Get Performance Metric</button>
      <button onClick={() => deletePerformanceMetric(1)}>Delete Performance Metric</button>
      <button onClick={() => postRecommendations({ userId: 1, recommendation: 'New Recommendation' })}>Post Recommendation</button>
      <button onClick={() => getRecommendations(1)}>Get Recommendations</button>
      <button onClick={() => postUser({ name: 'John Doe' })}>Post User</button>
      <button onClick={() => getUser(1)}>Get User</button>
      <button onClick={() => updateUser(1, { name: 'Jane Doe' })}>Update User</button>
      <button onClick={() => deleteUser(1)}>Delete User</button>
      <button onClick={() => postNotification({ userId: 1, message: 'New Notification' })}>Post Notification</button>
      <button onClick={() => getNotifications(1)}>Get Notifications</button>
      <button onClick={() => markNotificationAsRead(1)}>Mark Notification as Read</button>
    </div>
  );
};

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RecordingService from './components/RecordingService';
import Analysis from './components/Analysis';
import Recommendation from './components/Recommendation';
import UserManagement from './components/UserManagement';
import NotificationService from './components/NotificationService';
import NotFound from './components/NotFound'; // A 404 component for unmatched routes

/**
 * App component that sets up routing for the application.
 */
const App = () => {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/" component={RecordingService} />
          <Route path="/analysis/:sessionId" component={Analysis} />
          <Route path="/recommendations/:userId" component={Recommendation} />
          <Route path="/users" component={UserManagement} />
          <Route path="/notifications" component={NotificationService} />
          <Route component={NotFound} /> {/* Fallback for unmatched routes */}
        </Switch>
      </div>
    </Router>
  );
};

export default App;