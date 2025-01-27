import React, { useState } from 'react';

/**
 * DataValidationModule is a React component that takes raw match data,
 * validates its integrity and accuracy, and displays validation results.
 */
const DataValidationModule = () => {
    const [data, setData] = useState(null);
    const [isValid, setIsValid] = useState(null);
    const [errors, setErrors] = useState([]);

    /**
     * Validates the data.
     * @param {Object} rawData - The raw match data to validate.
     * @returns {Object} - Validation result containing isValid and errors.
     */
    const validateData = (rawData) => {
        let validations = [];

        // Example validation rules
        if (!rawData || Object.keys(rawData).length === 0) {
            validations.push('Data cannot be empty.');
        }

        // Additional validation rules can be added here

        const isValid = validations.length === 0;
        return { isValid, errors: validations };
    };

    /**
     * Handler for validation submission.
     * Uses the validateData function and sets the state accordingly.
     */
    const handleValidation = () => {
        const result = validateData(data);
        setIsValid(result.isValid);
        setErrors(result.errors);
        if (onValidationComplete) {
            onValidationComplete({ isValid: result.isValid, errors: result.errors });
        }
    };

    /**
     * Callback function indicating the result of the validation process.
     * @param {Object} validationResult - Result of the validation process.
     */
    const onValidationComplete = (validationResult) => {
        console.log('Validation completed:', validationResult);
    };

    return (
        <div className="validation-container">
            <input 
                type="text" 
                onChange={(e) => setData(JSON.parse(e.target.value))} 
                placeholder="Enter match data in JSON format"
                className="inputField"
            />
            <button onClick={handleValidation} className="buttonStyle">Validate Data</button>
            <div className="validationResultsContainer">
                {isValid !== null && (
                    <h3>{isValid ? 'Data is valid!' : 'Data is invalid!'}</h3>
                )}
                {errors.length > 0 && <ul>{errors.map((error, index) => <li key={index}>{error}</li>)}</ul>}
            </div>
        </div>
    );
};

export default DataValidationModule;