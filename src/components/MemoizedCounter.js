import React, { useState, useMemo } from 'react';

// MemoizedCounter component to demonstrate useMemo for optimization
const MemoizedCounter = () => {
    const [count, setCount] = useState(0);
    const [value, setValue] = useState(0);

    // useMemo to optimize expensive calculation
    const expensiveCalculation = useMemo(() => {
        console.log('Calculating...');
        return count * 2; // Example of an expensive calculation
    }, [count]);

    return (
        <div>
            <h1>Count: {count}</h1>
            <h2>Expensive Calculation: {expensiveCalculation}</h2>
            <button onClick={() => setCount(count + 1)}>Increment Count</button>
            <input type="number" value={value} onChange={(e) => setValue(Number(e.target.value))} />
        </div>
    );
};

export default MemoizedCounter;