import React from 'react';
const Dashboard = ({ insights }) => {
    return (
        <div>
            <h2>Dashboard Insights</h2>
            <ul>{insights.map((insight, index) => <li key={index}>{insight}</li>)}</ul>
        </div>
    );
};

export default Dashboard;