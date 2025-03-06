import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserManagement from './components/UserManagement';
import Recording from './components/Recording';
import Analysis from './components/Analysis';
import Recommendations from './components/Recommendations';
import NotFound from './components/NotFound';

/**
 * App component serves as the main entry point for the application.
 * It sets up the routing for different components of the e-sports system.
 */
const App = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/users" component={UserManagement} />
                    <Route path="/recording" component={Recording} />
                    <Route path="/analysis" component={Analysis} />
                    <Route path="/recommendations" component={Recommendations} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;

// NotFound.js
import React from 'react';

/**
 * NotFound component displays a 404 error message when the route is not found.
 */
const NotFound = () => {
    return <h2>404 - Not Found</h2>;
};

export default NotFound;

// Unit Tests for App Component
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App Component', () => {
    test('renders UserManagement route', () => {
        render(
            <MemoryRouter initialEntries={["/users"]}>
                <App />
            </MemoryRouter>
        );
        const titleElement = screen.getByText(/User Management/i);
        expect(titleElement).toBeInTheDocument();
    });

    test('renders NotFound for unknown route', () => {
        render(
            <MemoryRouter initialEntries={["/unknown"]}>
                <App />
            </MemoryRouter>
        );
        const notFoundElement = screen.getByText(/404 - Not Found/i);
        expect(notFoundElement).toBeInTheDocument();
    });
});

// Integration Tests for App Component
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App Integration Tests', () => {
    test('navigates to UserManagement on /users route', () => {
        render(
            <MemoryRouter initialEntries={["/users"]}>
                <App />
            </MemoryRouter>
        );
        const userManagementElement = screen.getByText(/User Management/i);
        expect(userManagementElement).toBeInTheDocument();
    });

    test('navigates to NotFound on unknown route', () => {
        render(
            <MemoryRouter initialEntries={["/unknown"]}>
                <App />
            </MemoryRouter>
        );
        const notFoundElement = screen.getByText(/404 - Not Found/i);
        expect(notFoundElement).toBeInTheDocument();
    });
});

// Note: Ensure to run tests using a testing framework like Jest.