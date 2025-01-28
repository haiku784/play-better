import React, { useState } from 'react';

const DeleteUserProfileComponent = ({ onProfileDeleted }) => {
    // State management
    const [userId, setUserId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Function to handle profile deletion
    const deleteUserProfile = async (event) => {
        event.preventDefault(); // Prevent form submission
        setIsLoading(true); // Start loading state
        setIsError(false); // Reset error state

        try {
            const response = await fetch(`/api/users/${userId}`, {
                method: 'DELETE',
            });
            const data = await response.json();

            if (response.ok) {
                setSuccessMessage(data.message);
                onProfileDeleted(data.status, data.message); // Callback to parent
            } else {
                setIsError(true);
                setErrorMessage(data.message);
            }
        } catch (error) {
            setIsError(true);
            setErrorMessage('An unexpected error occurred.');
        } finally {
            setIsLoading(false); // End loading state
        }
    };

    return (
        <div className='form-container'>
            <form onSubmit={deleteUserProfile}>
                <input
                    type='text'
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className='input-field'
                    placeholder='Enter User ID'
                    required
                />
                <button type='submit' disabled={isLoading}>Delete Profile</button>
                {isLoading && <p>Loading...</p>}
                {isError && <p className='error-message'>{errorMessage}</p>}
                {successMessage && <p className='success-message'>{successMessage}</p>}
            </form>
        </div>
    );
};

export default DeleteUserProfileComponent;