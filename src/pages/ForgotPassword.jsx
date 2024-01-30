import React, { useState } from 'react';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('https://vaultcoin-production.up.railway.app/user/auth/password-reset/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': 'qs5n8IhaDjlYzh8q4eNPvoR0uE9cKeHBjaheG2XaEByZhIox9oXADdvmu1OPbaBb', // Replace with your actual CSRF token
        },
        body: JSON.stringify({ email }),
      });
  
      if (response.ok) {
        const data = await response.json();
        setSuccess(data.message);
        setError('');
      } else {
        const errorData = await response.json();
        
        // Check if the error message indicates that the email does not exist
        if (errorData.message.toLowerCase().includes('email does not exist')) {
          setError('Email does not exist');
          setSuccess('');
        } else {
          // Handle other error cases
          setError(errorData.message);
          setSuccess('');
        }
      }
    } catch (error) {
      console.error('An error occurred during password reset request:', error);
      setError('Email does not exist.');
      setSuccess('');
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-md px-4 py-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="text-gray-700">
              Email:
            </label>
            <input
              name='email'
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            Reset Password
          </button>
        </form>
        {error && <div className="text-red-500 my-4">{error}</div>}
        {success && <div className="text-green-500 my-4">{success}</div>}
      </div>
    </div>
  );
}

export default ForgotPassword;
