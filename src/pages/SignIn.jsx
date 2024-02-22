import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';
import MainLayout from '../components/MainLayout';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [lineWidth, setLineWidth] = useState('100%');
  const [csrfToken, setCsrfToken] = useState('');

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      setError('');
      setShowPopup(true);
      setPopupMessage('Signing in...');

      // Fetch CSRF token
      await axios.get('https://vaultcoin-production.up.railway.app/csrf-token')
        .then(response => {
          const csrfToken = response.headers['x-csrf-token'];
          setCsrfToken(csrfToken);
        });

      const response = await axios.post(
        'https://vaultcoin-production.up.railway.app/user/auth/login/',
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken 
          },
        }
      );

      const { user, token } = response.data;

      if (user && token && token.access) {
        console.log('JWT Token:', `Bearer ${token.access}`);
        setPopupMessage('Logged in successfully!');

        setTimeout(() => {
          navigate('/dashboard', { state: { user } });
        }, 3000);
      } else {
        setError('Credentials are invalid.');
        setPopupMessage('Credentials are invalid.');
      }
    } catch (error) {
      setError('Invalid credentials. Please try again.');
      setPopupMessage('Invalid credentials. Please try again.');
    } finally {
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLineWidth(`${Math.max(lineWidth.slice(0, -1) - 1, 0)}%`);
    }, 100);

    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
      setShowPopup(false);
    }, 3000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [lineWidth]);

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div>
      <MainLayout>
        <div className="relative h-[100vh] left-[50%] flex flex-col justify-center w-[100%] -translate-x-1/2 max-lg:px-5">
          <div className="w-[50%] max-sm:w-[100%] mx-auto my-5">
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
                    height: '2px',
                    backgroundColor: error ? 'red' : 'green',
                    transition: 'width 0.5s ease',
                  }}
                />
                {popupMessage}
              </div>
            )}
          </div>
          <h2 className="text-[2rem] font-semibold mb-4 text-center text-blue-600">
            SignIn
          </h2>

          <form
            className="max-w-md mx-auto relative w-[100%]"
            onSubmit={handleSignIn}
          >
            <div className="mb-4 w-[100%]">
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
                className="mt-1 p-2 bg-gray-100 border-2 border-solid border-gray-200 focus:border-blue-700  bg-[transparent]  outline-none rounded-lg px-2 py-3 w-[100%]"
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
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 bg-gray-100 border-2 border-solid border-gray-200 focus:border-blue-700  bg-[transparent]  outline-none rounded-lg px-2 py-3 w-[100%]"
              />
              <button
                type="button"
                onClick={handleTogglePasswordVisibility}
                className=" cursor-pointer  absolute bottom-7  right-3"
              >
                {showPassword ? <span>👁️</span> : <span>🔒</span>}
              </button>
            </div>

            {showPopup ? (
              <button
                type="button"
                className="bg-blue-700 absolute left-1/2 translate-x-[-50%] text-white px-4 py-2 rounded-md opacity-50 cursor-not-allowed"
                disabled
              >
                <SyncLoader
                  size={10}
                  color={error ? 'white' : 'white'}
                  loading={true}
                />
              </button>
            ) : (
              <button
                type="submit"
                className="bg-blue-700 absolute left-1/2 translate-x-[-50%] text-white px-4 py-2 rounded-md hover:bg-blue-500"
              >
                SignIn
              </button>
            )}
          </form>

          <Link to="/forgot-password">
            <p className="mt-20 flex justify-center">
              <span>Forgot Password</span>
            </p>
          </Link>
        </div>
      </MainLayout>
    </div>
  );
};
export default SignIn;
