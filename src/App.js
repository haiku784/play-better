import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RecordingService from './components/RecordingService';
import AnalysisService from './components/AnalysisService';
import RecommendationService from './components/RecommendationService';
import UserPreferences from './components/UserPreferences';
import NotFound from './components/NotFound';

/**
 * App component that sets up routing for the application.
 */
const App = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/recordings" component={RecordingService} />
                    <Route path="/analysis" component={AnalysisService} />
                    <Route path="/recommendations" component={RecommendationService} />
                    <Route path="/preferences" component={UserPreferences} />
                    <Route path="*" component={NotFound} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;

/**
 * NotFound component for handling 404 errors.
 */
const NotFound = () => {
    return <h2>404 - Page Not Found</h2>;
};

/**
 * Unit Tests for App component
 */
// App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App Component', () => {
    test('renders RecordingService component on /recordings route', () => {
        render(
            <MemoryRouter initialEntries={["/recordings"]}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByText(/Recording Service/i)).toBeInTheDocument();
    });

    test('renders AnalysisService component on /analysis route', () => {
        render(
            <MemoryRouter initialEntries={["/analysis"]}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByText(/Analysis Service/i)).toBeInTheDocument();
    });

    test('renders RecommendationService component on /recommendations route', () => {
        render(
            <MemoryRouter initialEntries={["/recommendations"]}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByText(/Recommendation Service/i)).toBeInTheDocument();
    });

    test('renders UserPreferences component on /preferences route', () => {
        render(
            <MemoryRouter initialEntries={["/preferences"]}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByText(/User Preferences/i)).toBeInTheDocument();
    });

    test('renders NotFound component for unknown routes', () => {
        render(
            <MemoryRouter initialEntries={["/unknown"]}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByText(/404 - Page Not Found/i)).toBeInTheDocument();
    });
});

/**
 * Integration Tests for App component
 */
// App.integration.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App Integration Tests', () => {
    test('navigates to different routes', () => {
        render(
            <MemoryRouter initialEntries={["/recordings"]}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByText(/Recording Service/i)).toBeInTheDocument();

        render(
            <MemoryRouter initialEntries={["/analysis"]}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByText(/Analysis Service/i)).toBeInTheDocument();

        render(
            <MemoryRouter initialEntries={["/recommendations"]}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByText(/Recommendation Service/i)).toBeInTheDocument();

        render(
            <MemoryRouter initialEntries={["/preferences"]}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByText(/User Preferences/i)).toBeInTheDocument();

        render(
            <MemoryRouter initialEntries={["/unknown"]}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByText(/404 - Page Not Found/i)).toBeInTheDocument();
    });
});

// Note: Ensure to run tests using a testing framework like Jest.