import React, { useState, useEffect } from 'react';"n
const EditUser = ({ userId }) => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`/api/users/${userId}`);
            const data = await response.json();
            setUser(data);
            setName(data.name);
            setEmail(data.email);
        };
        fetchUser();
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch(`/api/users/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email }),
        });
    };

    if (!user) return <div>Loading...</div>;

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label>Email:</label>
                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <button type='submit'>Update User</button>
        </form>
    );
};

export default EditUser;