import React, { useState } from 'react';

const DataValidationModule = ({ onValidationComplete }) => {
    const [data, setData] = useState(null);
    const [isValid, setIsValid] = useState(false);
    const [errors, setErrors] = useState([]);

    const validateData = (rawData) => {
        // Placeholder for actual validation logic
        let validationErrors = [];

        // Example validation checks
        if (!rawData || typeof rawData !== 'object') {
            validationErrors.push('Data must be a valid object.');
        }

        // Update state based on validation results
        setErrors(validationErrors);
        setIsValid(validationErrors.length === 0);
        onValidationComplete({ isValid: validationErrors.length === 0, errors: validationErrors });
    };

    const handleValidation = () => {
        validateData(data);
    };

    return (
        <div className="validation-container">
            <input 
                type="text" 
                onChange={(e) => setData(JSON.parse(e.target.value))} 
                className="inputField"
                placeholder="Enter raw match data in JSON format"
            />
            <button 
                onClick={handleValidation} 
                className="buttonStyle"
            >
                Validate Data
            </button>
            <div className="validationResultsContainer">
                <h3>Validation Results:</h3>
                <p>{isValid ? 'Data is valid!' : 'Data is invalid.'}</p>
                <ul>{errors.map((error, index) => <li key={index}>{error}</li>)}</ul>
            </div>
        </div>
    );
};

export default DataValidationModule;