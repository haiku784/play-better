import React, { useEffect } from 'react';

const CachingTest = () => {
    useEffect(() => {
        // Check if service worker is active
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then((registration) => {
                console.log('Service Worker is active:', registration.active);
            });
        }
    }, []);

    return <div>Check console for Service Worker status!</div>;
};

export default CachingTest;