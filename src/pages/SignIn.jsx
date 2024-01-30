import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import MainLayout from '../components/MainLayout';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [lineWidth, setLineWidth] = useState('100%'); // Initial line width

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
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

      const { user, token } = response.data;
        

      if (user && token && token.access) {
        console.log('JWT Token:', `Bearer ${token.access}`);
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${token.access}`;

        setShowPopup(true);
        setPopupMessage('Logged in successfully!');

        setTimeout(() => {
          navigate('/dashboard', { state: { user } });
        }, 3000);
      } else {
        setError('Credentials are invalid.');
        setShowPopup(true);
        setPopupMessage('Credentials are invalid.');
      }
    } catch (error) {
      setError('Invalid credentials. Please try again.');
      setShowPopup(true);
      setPopupMessage('Invalid credentials. Please try again.');
    }
  };

  useEffect(() => {
    // Update line width every 100 milliseconds
    const intervalId = setInterval(() => {
      setLineWidth(`${Math.max(lineWidth.slice(0, -1) - 1, 0)}%`);
    }, 100);

    // Clear interval after 3 seconds
    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
      setShowPopup(false);
    }, 3000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [lineWidth]);

  return (
    <div>
      <MainLayout>
        <div className="relative h-[100vh] left-[50%] top-[10rem]  -translate-x-1/2 max-lg:px-5">
          <div className='w-[50%] max-sm:w-[100%] mx-auto my-5'>
            {showPopup && (
              <div
                className={`text-center mt-4 ${
                  error
                    ? 'bg-red-200 text-red-900'
                    : 'bg-green-200 text-green-900'
                } p-2 rounded relative overflow-hidden`}
              >
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: lineWidth,
                    height: '2px', // Height of the line
                    backgroundColor: error ? 'red' : 'green', // Color of the line
                    transition: 'width 0.5s ease', // Add transition effect
                  }}
                />
                {popupMessage}
              </div>
            )}
          </div>
          <h2 className="text-[2rem] font-semibold mb-4 text-center text-blue-600">
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
              className="bg-blue-700 absolute left-1/2 translate-x-[-50%] text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              SignIn
            </button>
          </form>
          {/* Show popup based on the state */}

          {/* {error && <p className="text-red-500 text-center mt-20 ">{error}</p>} */}

          <Link to="/forgot-password">
            <p className="mt-32 text-right mr-10 ">Forgot Password</p>
          </Link>
        </div>
      </MainLayout>
    </div>
  );
};

export default SignIn;
