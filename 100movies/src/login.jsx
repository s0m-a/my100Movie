import React, { useState } from 'react';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5050/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userName, password })
      });

      const data = await response.text(); // Get raw response text
      
      try {
        const json = JSON.parse(data); // Attempt to parse JSON
        if (response.ok) {
          // Handle successful login
          console.log('Login successful:', json);
        } else {
          // Handle login error
          setError(json.message);
        }
      } catch (jsonError) {
        console.error('Failed to parse JSON:', jsonError);
        setError('Server returned an invalid JSON response');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Server error');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;
