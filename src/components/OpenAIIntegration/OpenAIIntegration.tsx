import React, { useState } from 'react';

const OpenAIIntegration = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await fetch('/api/openai-process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input }),
    });
    const data = await res.json();
    setResponse(data.output);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' value={input} onChange={handleInputChange} />
        <button type='submit'>Submit</button>
      </form>
      <div>Response: {response}</div>
    </div>
  );
};

export default OpenAIIntegration;