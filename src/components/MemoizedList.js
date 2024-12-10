import React, { useMemo } from 'react';

// List of items to display
const items = Array.from({ length: 1000 }, (_, index) => `Item ${index + 1}`);

const MemoizedList = () => {
    const filteredItems = useMemo(() => {
        console.log('Filtering items...');
        return items.filter(item => item.includes('1')); // Example filter condition
    }, []);

    return (
        <div>
            <h1>Filtered List:</h1>
            <ul>
                {filteredItems.map(item => (<li key={item}>{item}</li>))}
            </ul>
        </div>
    );
};

export default MemoizedList;