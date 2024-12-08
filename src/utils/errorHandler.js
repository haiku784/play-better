const handleGameplayError = (error) => {
  const userFriendlyMessage = 'An unexpected error occurred during gameplay. Please try again later.';
  console.error(error);
  return userFriendlyMessage;
};

export default handleGameplayError;