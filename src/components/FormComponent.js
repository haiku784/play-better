import React, { useState } from 'react';
import InputWithLabel from './InputWithLabel';

/**
 * FormComponent contains form inputs for user interaction.
 */
const FormComponent = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    return (
        <form>
            <InputWithLabel 
                id="username" 
                label="Username:" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
            />
            <InputWithLabel 
                id="email" 
                label="Email:" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                type="email"
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default FormComponent;