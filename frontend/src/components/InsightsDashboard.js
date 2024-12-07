import React from 'react';

const InsightsDashboard = ({ insights }) => {
    return (
        <div>
            <h2>Insights Dashboard</h2>
            <p>{insights.strategy}</p>
            {/* Render further insights here */}
        </div>
    );
};

export default InsightsDashboard;