import React, { useState } from 'react';
import PricingPlan from '../components/PricingPlan';
import { AUTH_TOKEN, CSRF_TOKEN } from './config';

const Transfer = () => {
  // State to manage form inputs
  const [receiverUsername, setReceiverUsername] = useState('');
  const [amount, setAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState(null); // State to store error message
  const [responseMessage, setResponseMessage] = useState(null); // State to store response message

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make POST request to API endpoint
      const response = await fetch(
        'https://vaultcoin-production.up.railway.app/transfer/',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: AUTH_TOKEN,
            'X-CSRFToken': CSRF_TOKEN,
          },
          body: JSON.stringify({
            email: receiverUsername,
            usdt_amount: amount,
          }),
        }
      );

      // Check if request was successful
      if (response.ok) {
        // Handle success
        const responseData = await response.json();
        setResponseMessage(responseData.message); // Set response message
        setErrorMessage(null); // Clear error message if previous transfer attempt had an error
      } else {
        // Handle error response
        const errorData = await response.json();
        setResponseMessage(null); // Clear response message if there was an error
        setErrorMessage(errorData.message); // Set error message received from the backend
      }

      console.log(response);
    } catch (error) {
      // Handle fetch error
      console.error('Error making transfer:', error);
      setErrorMessage('Failed to make transfer. Please try again later.');
      setResponseMessage(null); // Clear response message if there was an error
    }
  };

  return (
    <div>
      <div className="px-3 bg-white relative bottom-6 shadow-xl h-[25rem] w-[90%] translate-x-[-50%] left-1/2 m-0 rounded">
        <p className="px-3 py-5 border-b-[1px] border-[#00000010] mb-2 font-semibold text-[1.2rem]">
          Transfer 
        </p>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="receiverUsername">Enter Receiver Username: *</label>
            <input
              type="email"
              className="w-[100%] rounded"
              value={receiverUsername}
              onChange={(e) => setReceiverUsername(e.target.value)}
            />
          </div>
          <div className="mt-10">
            <label htmlFor="amount">Enter Amount: *</label>
            <input
              type="number"
              className="w-[100%] rounded"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="cursor-pointer mt-5 py-3 w-[100%] bg-gradient-to-br from-gray-800 to-gray-900 text-white font-semibold rounded"
          >
            Make Transfer
          </button>

          {/* Display response message or error message if they exist */}
          {responseMessage && <div className="text-green-500">{responseMessage}</div>}
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        </form>
      </div>
      <PricingPlan />
    </div>
  );
};

export default Transfer;
