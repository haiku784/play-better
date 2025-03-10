import React, { useEffect, useState } from 'react';
import './SharingService.css';

/**
 * SharingService component allows users to share their health records with others.
 * It fetches existing sharing permissions and allows users to create new sharing permissions.
 */
const SharingService = () => {
    const [permissions, setPermissions] = useState([]);
    const [newPermission, setNewPermission] = useState({ sharedWithUserID: '', recordID: '', permissionType: '' });
    const API_URL = 'http://localhost:5000'; // Replace with your API URL

    /**
     * Fetch existing sharing permissions from the API.
     */
    const fetchPermissions = async () => {
        const response = await fetch(`${API_URL}/sharing/permissions`);
        const data = await response.json();
        setPermissions(data);
    };

    /**
     * Create a new sharing permission.
     * @param {Object} permission - The permission object to be created.
     */
    const createPermission = async (permission) => {
        const response = await fetch(`${API_URL}/sharing/permissions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(permission),
        });
        const data = await response.json();
        console.log(data);
        fetchPermissions(); // Refresh permissions list
    };

    /**
     * Handle form submission for creating a new sharing permission.
     * @param {Event} e - The event object.
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        createPermission(newPermission);
        setNewPermission({ sharedWithUserID: '', recordID: '', permissionType: '' }); // Reset form
    };

    useEffect(() => {
        fetchPermissions();
    }, []);

    return (
        <div className="sharing-service">
            <h2>Sharing Health Records</h2>
            <form onSubmit={handleSubmit} className="sharing-form">
                <input
                    type="text"
                    placeholder="User ID to share with"
                    value={newPermission.sharedWithUserID}
                    onChange={(e) => setNewPermission({ ...newPermission, sharedWithUserID: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Record ID"
                    value={newPermission.recordID}
                    onChange={(e) => setNewPermission({ ...newPermission, recordID: e.target.value })}
                    required
                />
                <select
                    value={newPermission.permissionType}
                    onChange={(e) => setNewPermission({ ...newPermission, permissionType: e.target.value })}
                    required
                >
                    <option value="">Select Permission Type</option>
                    <option value="view">View</option>
                    <option value="edit">Edit</option>
                </select>
                <button type="submit">Share Record</button>
            </form>
            <h3>Current Sharing Permissions</h3>
            <ul>
                {permissions.map(permission => (
                    <li key={permission.permissionID}>
                        Shared with User ID: {permission.sharedWithUserID}, Record ID: {permission.recordID}, Type: {permission.permissionType}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SharingService;