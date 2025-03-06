import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import Analysis from './Analysis';
import Recommendations from './Recommendations';
import NotFound from './NotFound';

/**
 * Main application component that sets up routing for the application.
 */
const MainRouter = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/analysis" component={Analysis} />
                <Route path="/recommendations" component={Recommendations} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
};

export default MainRouter;

/**
 * Analysis Component
 * Displays analysis results for gameplay sessions.
 */
const Analysis = () => {
    return <div>Analysis Results</div>;
};

/**
 * Recommendations Component
 * Displays gear and configuration recommendations.
 */
const Recommendations = () => {
    return <div>Recommendations</div>;
};

/**
 * NotFound Component
 * Displays a 404 Not Found message.
 */
const NotFound = () => {
    return <div>404 Not Found</div>;
};

/**
 * Unit Tests for MainRouter Component
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MainRouter from './MainRouter';

describe('MainRouter Component', () => {
    test('renders App component on root path', () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <MainRouter />
            </MemoryRouter>
        );
        expect(screen.getByText(/Gameplay Recordings/i)).toBeInTheDocument();
    });

    test('renders Analysis component on /analysis path', () => {
        render(
            <MemoryRouter initialEntries={["/analysis"]}>
                <MainRouter />
            </MemoryRouter>
        );
        expect(screen.getByText(/Analysis Results/i)).toBeInTheDocument();
    });

    test('renders Recommendations component on /recommendations path', () => {
        render(
            <MemoryRouter initialEntries={["/recommendations"]}>
                <MainRouter />
            </MemoryRouter>
        );
        expect(screen.getByText(/Recommendations/i)).toBeInTheDocument();
    });

    test('renders NotFound component for unknown paths', () => {
        render(
            <MemoryRouter initialEntries={["/unknown"]}>
                <MainRouter />
            </MemoryRouter>
        );
        expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();
    });
});

// Note: Ensure to install necessary packages for routing and testing: 
// npm install --save react-router-dom @testing-library/react @testing-library/jest-dom
// This code provides a complete implementation of the routing for the frontend components with proper documentation and unit tests.