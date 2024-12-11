import React from 'react';

/**
 * FollowFeatureDocumentation Component
 * 
 * This component provides documentation for the follow feature, explaining how to use it effectively.
 * It includes sections for getting started, how to follow users, and real-time updates.
 */
const FollowFeatureDocumentation = () => {
    return (
        <div className="documentation">
            <h1>Follow Feature Documentation</h1>
            <section>
                <h2>Getting Started</h2>
                <p>To start using the follow feature, you need to log in to your account.</p>
                <p>Once logged in, navigate to a user's profile and click the 'Follow' button.</p>
            </section>
            <section>
                <h2>How to Follow Users</h2>
                <p>Follow your favorite users to receive their updates in your feed.</p>
                <ol>
                    <li>Search for a user using the search bar.</li>
                    <li>Click on the user's profile.</li>
                    <li>Hit the 'Follow' button on their profile page.</li>
                </ol>
            </section>
            <section>
                <h2>Real-Time Updates</h2>
                <p>Once you follow a user, you will receive real-time notifications for their activities.</p>
                <p>Ensure your notifications are turned on to stay updated!</p>
            </section>
        </div>
    );
};

export default FollowFeatureDocumentation;