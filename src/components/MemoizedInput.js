import React, { useState, memo } from 'react';

// MemoizedInput component using React.memo for optimization
const Input = ({ value, onChange }) => {
    console.log('Rendering Input...');
    return <input type="text" value={value} onChange={onChange} />;
};

const MemoizedInput = memo(Input);

const ParentComponent = () => {
    const [inputValue, setInputValue] = useState('');
    const [otherState, setOtherState] = useState(0);

    return (
        <div>
            <h1>Other State: {otherState}</h1>
            <MemoizedInput value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <button onClick={() => setOtherState(otherState + 1)}>Change Other State</button>
        </div>
    );
};

export default ParentComponent;