import React, { useState } from 'react';"n
function InputForm() {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/data', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ data: inputValue }),
        });
        const result = await response.json();
        console.log(result);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type='text' 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)} 
                placeholder='Enter data' 
            />
            <button type='submit'>Submit</button>
        </form>
    );
}

export default InputForm;