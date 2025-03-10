import React, { useEffect, useState } from 'react';
import './HealthRecord.css'; // Importing CSS for styling

/**
 * HealthRecord component to manage health records.
 * This component fetches, displays, and allows CRUD operations on health records.
 */
const HealthRecord = () => {
    const [healthRecords, setHealthRecords] = useState([]);
    const [newRecord, setNewRecord] = useState({ recordType: '', content: '' });
    const API_URL = 'http://localhost:5000/health-records'; // Replace with your API URL

    /**
     * Fetch all health records from the API.
     */
    const fetchHealthRecords = async () => {
        const response = await fetch(API_URL);
        const data = await response.json();
        setHealthRecords(data);
    };

    /**
     * Create a new health record.
     * @param {Object} record - The health record to be created.
     */
    const createHealthRecord = async (record) => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(record),
        });
        const data = await response.json();
        setHealthRecords([...healthRecords, data]); // Update state with new record
    };

    /**
     * Handle form submission to create a new health record.
     * @param {Event} e - The form event.
     */
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        createHealthRecord(newRecord);
        setNewRecord({ recordType: '', content: '' }); // Reset form
    };

    /**
     * Handle input changes for the new record form.
     * @param {Event} e - The input event.
     */
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRecord({ ...newRecord, [name]: value });
    };

    useEffect(() => {
        fetchHealthRecords(); // Fetch health records on component mount
    }, []);

    return (
        <div className="health-record-container">
            <h2>Health Records</h2>
            <form onSubmit={handleSubmit} className="record-form">
                <input
                    type="text"
                    name="recordType"
                    placeholder="Record Type"
                    value={newRecord.recordType}
                    onChange={handleInputChange}
                    required
                />
                <textarea
                    name="content"
                    placeholder="Record Content"
                    value={newRecord.content}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">Add Record</button>
            </form>
            <ul className="record-list">
                {healthRecords.map(record => (
                    <li key={record.recordID} className="record-item">
                        <h3>{record.recordType}</h3>
                        <p>{record.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HealthRecord;