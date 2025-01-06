import React from 'react';
import ResponsiveButton from './ResponsiveButton';
import ResponsiveInputField from './ResponsiveInputField';
import './ResponsiveForm.css';

/**
 * A responsive form component containing input fields and a submit button.
 * @param {Object} props - The component props.
 * @param {function} props.onSubmit - The submit handler for the form.
 */
const ResponsiveForm = ({ onSubmit }) => {
    const [inputValue, setInputValue] = React.useState('');

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(inputValue);
    };

    return (
        <form className="responsive-form" onSubmit={handleSubmit}>
            <ResponsiveInputField 
                label="Enter Text:" 
                value={inputValue} 
                onChange={handleChange} 
            />
            <ResponsiveButton label="Submit" onClick={handleSubmit} />
        </form>
    );
};

export default ResponsiveForm;