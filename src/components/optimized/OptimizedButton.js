import React, { memo } from 'react';

// OptimizedButton is a memoized functional component that only re-renders when props change, improving performance.
const OptimizedButton = memo(({ label, onClick }) => {
    console.log('Rendering:', label); // For debugging purposes
    return <button onClick={onClick}>{label}</button>;
});

export default OptimizedButton;