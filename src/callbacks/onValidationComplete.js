const onValidationComplete = ({ isValid, errors }) => {
    // This callback is called when the validation process is complete.
    console.log('Validation Status:', isValid ? 'Valid' : 'Invalid');
    if (!isValid) {
        console.log('Errors:', errors);
    }
};

export default onValidationComplete;