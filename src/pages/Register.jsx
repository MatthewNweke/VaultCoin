import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import { API_URL } from '../constants/api';
import { SyncLoader } from 'react-spinners';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    username: '',
    is_active: false,
    referral_code: '',
    country: '',
  });

  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error.message);
        setError('Error fetching countries');
      }
    };

    fetchCountries();
  }, []);

  const handleInputChange = (e) => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Password and Confirm Password do not match');
      return;
    }

    // Password validation criteria
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(formData.password)) {
      setError(
        'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.'
      );
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/user/auth/create/`,
        {
          email: formData.email,
          password: formData.password,
          first_name: formData.first_name,
          last_name: formData.last_name,
          username: formData.username,
          is_active: formData.is_active,
          referral_code: formData.referral_code,
          country: formData.country,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Assuming the API response structure is similar to the provided example
      const { access, refresh, user } = response.data;
      
      // Store tokens in localStorage or a secure storage mechanism
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);

      // Handle user data if needed
      // console.log('User Data:', user);

      // Reset the form after successful submission
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        first_name: '',
        last_name: '',
        username: '',
        is_active: false,
        referral_code: '',
        country: '',
      });

      setError('Account Created Successfully');
    } catch (error) {
      // Error handling...

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 400) {
          // Custom error handling based on the response data
          const { data } = error.response;
          if (
            data.email &&
            data.email[0] === 'custom user with this Email already exists.'
          ) {
            setError('User with this email already exists.');
          } else if (
            data.username &&
            data.username[0] ===
              'custom user with this User Name already exists.'
          ) {
            setError('User with this username already exists.');
            
          } else {
            // Handle other specific error cases if needed
            setError('Registration failed. Please check your input.');
          }
        }
      } else {
        // Handle other types of errors (e.g., network error)
        setError('An unexpected error occurred. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleTogglePasswordVisibility1 = () => {
    setShowPassword1((prevShowPassword) => !prevShowPassword);
  };
  const handleTogglePasswordVisibility2 = () => {
    setShowPassword2((prevShowPassword) => !prevShowPassword);
  };
  

  return (
    <div>
      <div className="bg-gray-600 bg-[url('/jj-ying-7JX0-bfiuxQ-unsplash.jpg')] bg-contain bg-repeat">
        <MainLayout>
          <div className="flex flex-col bg-gray-50 shadow-xl p-10 rounded-lg my-32 mx-auto w-[40%] max-xl:w-[60%] max-lg:w-[70%] max-sm:w-[100%] max-sm:p-1">
            <div className="h-[15rem] px-5 flex flex-col justify-center gap-5 text-gray-600 border-b-0 rounded-lg rounded-bl-0 rounded-br-0">
              <p className="text-[2rem] font-semibold max-sm:text-[1.5rem]">
                Welcome To <br />{' '}
                <span className="text-blue-700  ">VaultCoin</span>{' '}
              </p>
              <p>
                Our goal is to provide our investors with a reliable source of
                high income, join us today.
              </p>
              <p className="text-black font-medium">
                Please fill in the details below
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="text-gray-500 font-medium flex flex-col p-10 w-[100%] rounded-lg justify-center items-center pt-0 py-10 px-5"
            >
              <div className="flex flex-col gap-4 mb-5 w-[100%]">
                <label htmlFor="first_name">First Name</label>
                <input
                  name="first_name"
                  type="text"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-100 border-2 border-solid border-gray-200 focus:border-blue-700  bg-[transparent]  outline-none rounded-lg px-2 py-3 w-[100%]"
                />
              </div>
              <div className="flex flex-col gap-4 mb-5  w-[100%]">
                <label htmlFor="last_name">LastName</label>
                <input
                  name="last_name"
                  type="text"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-100 border-2 border-solid border-gray-200 focus:border-blue-700  bg-[transparent]  outline-none rounded-lg px-2 py-3  w-[100%]"
                />
              </div>
              <div className="flex flex-col gap-4 mb-5 w-[100%]">
                <label htmlFor="country">Country</label>
                <select
                  name="country"
                  id="country"
                  onChange={handleInputChange}
                  value={formData.country}
                  className="bg-gray-100 rounded-lg"
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option
                      key={country.name.common}
                      value={country.name.common}
                    >
                      {country.name.common}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-4 mb-5  w-[100%]">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-100 border-2 border-solid border-gray-200 focus:border-blue-700  bg-[transparent]  outline-none rounded-lg px-2 py-3 w-[100%]"
                />
              </div>
              <div className="flex flex-col gap-4 mb-5  w-[100%]">
                <label htmlFor="">User Name</label>
                <input
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  type="text"
                  className="bg-gray-100 border-2 border-solid border-gray-200 focus:border-blue-700  bg-[transparent]  outline-none rounded-lg px-2 py-3 w-[100%]"
                />
              </div>
              <div className="flex flex-col gap-4 mb-5 relative w-[100%]">
                <label htmlFor="password">Password</label>
                <input
                  type={showPassword1 ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-100 border-2 border-solid border-gray-200 focus:border-blue-700  bg-[transparent]  outline-none rounded-lg px-2 py-3 w-[100%]"
                />
                <button
                  type="button"
                  onClick={handleTogglePasswordVisibility1}
                  className=" cursor-pointer absolute top-[3.2rem]  right-3"
                >
                  {showPassword1 ? <span>👁️</span> : <span>🔒</span>}
                </button>
              </div>
              <div className="flex flex-col gap-4 mb-5 relative w-[100%]">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type={showPassword2 ? 'text' : 'password'}
                  onChange={handleInputChange}
                  value={formData.confirmPassword}
                  required
                  name="confirmPassword"
                  className="bg-gray-100 border-2 border-solid border-gray-200 focus:border-blue-700 bg-[transparent]  outline-none rounded-lg px-2 py-3 w-[100%]"
                />

                <button
                  type="button"
                  onClick={handleTogglePasswordVisibility2}
                  className="cursor-pointer absolute top-[3.2rem]  right-3"
                >
                  {showPassword2 ? <span>👁️</span> : <span>🔒</span>}
                </button>
              </div>
              {/* <div className="bg-[#003] h-[4rem] w-[100%] mb-5"></div> */}

              <div className="flex flex-col gap-4 mb-5  w-[100%]">
                <label htmlFor="referral_code"></label>
                <input
                  placeholder="Enter code"
                  type="text"
                  name="referral_code"
                  value={formData.referral_code}
                  onChange={handleInputChange}
                  required
                  className=" bg-gray-100 border-2 border-solid border-gray-200 focus:border-blue-700  bg-[transparent]  outline-none rounded-lg px-2 py-3 w-[100%]"
                />
              </div>
              <div className="flex items-center gap-3 ">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleInputChange}
                  
                />
                <p>
                  I agree with{' '}
                  <span className="text-blue-700  cursor-pointer">
                    Privacy & Policy
                  </span>{' '}
                  ,{' '}
                  <span className="text-blue-700  cursor-pointer">
                    Terms & Condition
                  </span>
                </p>
              </div>

              <div className="w-[100%]">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="border-2 border-blue-700 rounded-lg bg-white text-blue-700 px-3 py-2 text-center relative left-1/2 my-10 -translate-x-[50%]"
                >
                  {isLoading ? <SyncLoader
                  size={10}
                  color={error ? 'blue' : 'blue'}
                  loading={true}
                /> : 'Sign Up'}
                </button>
                {error && (
                  <p
                    style={{
                      color: error.includes('already exists') ? 'red' : 'green',
                    }}
                    className="p-2 text-center"
                  >
                    {error}
                  </p>
                )}
                <p className="text-center">
                  Have an account?{' '}
                  <Link to="/signin">
                    {' '}
                    <span className="text-blue-700  cursor-pointer">
                      Login
                    </span>{' '}
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </MainLayout>
      </div>
    </div>
  );
};

export default Register;
