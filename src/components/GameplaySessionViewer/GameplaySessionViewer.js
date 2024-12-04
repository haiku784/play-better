import React from 'react';

const GameplaySessionViewer = ({ sessions }) => {
    return (
        <div>
            <h1>Recorded Gameplay Sessions</h1>
            <ul>
                {sessions.map((session, index) => (
                    <li key={index}>
                        <h2>{session.title}</h2>
                        <video controls>
                            <source src={session.videoUrl} type='video/mp4' />
                            Your browser does not support the video tag.
                        </video>
                        <p>{session.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GameplaySessionViewer;