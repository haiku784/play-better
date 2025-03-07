import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserManagement from './UserManagement';
import RecordingService from './RecordingService';
import Analysis from './Analysis';
import Recommendation from './Recommendation';
import NotificationService from './NotificationService';
import App from './App';

/**
 * Main application routing component.
 */
const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <Route path="/users" component={UserManagement} />
                <Route path="/recording" component={RecordingService} />
                <Route path="/analysis/:sessionId" component={Analysis} />
                <Route path="/recommendations/:userId" component={Recommendation} />
                <Route path="/notifications/:userId" component={NotificationService} />
                <Route path="/" component={App} />
            </Switch>
        </Router>
    );
};

export default AppRouter;