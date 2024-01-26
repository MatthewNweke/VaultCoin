import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      // Make a request to the authentication API endpoint
      const response = await axios.post(
        'https://vaultcoin-production.up.railway.app/user/auth/login/',
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Assuming the API response structure is similar to the provided example
      const { user, token } = response.data;

      // Check if user exists
      if (user && token && token.access) {
        // Redirect to the dashboard
        window.location.href = '/dashboard';
      } else {
        setError('User does not exist.');
      }
    } catch (error) {
      // Handle errors (e.g., network error, invalid credentials)
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="relative top-[10rem] left-[50%] -translate-x-1/2 max-lg:px-5">
      <h2 className="text-[2rem] font-semibold mb-4 text-center text-green-600">
        SignIn
      </h2>
      <form className="max-w-md mx-auto relative" onSubmit={handleSignIn}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 absolute left-1/2 translate-x-[-50%] text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          SignIn
        </button>
      </form>

      {error && <p className="text-red-500 text-center mt-20 ">{error}</p>}
    </div>
  );
};

export default SignIn;
