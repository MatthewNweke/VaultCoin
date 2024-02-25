import React, { useState } from 'react';
import axios from 'axios';

const Transfer = () => {
  const [receiverUsername, setReceiverUsername] = useState('');
  const [amount, setAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [responseMessage, setResponseMessage] = useState(null);


// Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      'https://vaultcoin-production.up.railway.app/transfer/',
      {
        email: receiverUsername,
        usdt_amount: amount,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );

    if (response.status === 200) {
      setResponseMessage(response.data.message);
      setErrorMessage(null);
    } else {
      // Handle non-200 status codes here
      if (response.data && response.data.message) {
        setErrorMessage(response.data.message);
      } else {
        setErrorMessage('Failed to make transfer. Please try again later.');
      }
      setResponseMessage(null);
    }

    console.log(response);
  } catch (error) {
    console.error('Error making transfer:', error);
    if (error.response && error.response.data && typeof error.response.data === 'string') {
      // If the error message is provided by the server as a string, display it
      setErrorMessage(error.response.data);
    } else {
      // If no specific error message is received from the server, display a generic one
      setErrorMessage('Failed to make transfer. Please try again later.');
    }
    setResponseMessage(null);
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
            <label htmlFor="receiverUsername">Enter Receiver email: *</label>
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
            className="cursor-pointer mt-5 py-3 w-[100%] bg-blue-700 hover:bg-blue-500 text-white font-semibold rounded"
          >
            Make Transfer
          </button>

          {responseMessage && <div className="text-green-500">{responseMessage}</div>}
          {errorMessage && <div className="text-red-500 text-center mt-5">{errorMessage}</div>}
        </form>
      </div>
    </div>
  );
};

export default Transfer;
