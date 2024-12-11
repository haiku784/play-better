import React, { useState, useEffect } from 'react';

/**
 * Custom Hook to handle debouncing of inputs
 * @param {function} callback - Function to call after debouncing
 * @param {number} delay - Delay in milliseconds
 */
const useDebounce = (callback, delay) => {
    const [debouncedValue, setDebouncedValue] = useState('');

    useEffect(() => {
        const handler = setTimeout(() => {
            callback(debouncedValue);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [debouncedValue, delay, callback]);

    return [debouncedValue, setDebouncedValue];
};

/**
 * Input component that implements debouncing
 */
const InputDebounceComponent = () => {
    const [inputValue, setInputValue] = useDebounce((value) => {
        console.log('Debounced value:', value);
    }, 300); // 300ms debounce delay

    return (
        <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type something..."
        />
    );
};

export default InputDebounceComponent;