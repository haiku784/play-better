import React, { useState } from 'react';"nimport axios from 'axios';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await axios.post('/token', { username, password });
        console.log(response.data);
        // Store token in localStorage or context,
        // handle user state after authentication
    };

    return (
        <form onSubmit={handleLogin}>
            <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
            <button type='submit'>Login</button>
        </form>
    );
};

export default LoginForm;