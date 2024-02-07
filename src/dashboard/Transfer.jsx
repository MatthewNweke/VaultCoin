import React, { useState } from 'react';
import PricingPlan from '../components/PricingPlan';

const Transfer = () => {
  // State to manage form inputs
  const [receiverUsername, setReceiverUsername] = useState('');
  const [amount, setAmount] = useState('');

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
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA3MzYyNTE0LCJpYXQiOjE3MDcyNTQ1MTQsImp0aSI6ImJmMTg2ZTViZTljMjRkNTI4MjZmZjkzNzBmMDY4NjA0IiwidXNlcl9pZCI6NzAsImZpcnN0X25hbWUiOiJOV0VLRSIsImVtYWlsIjoibndla2VtYXR0aGV3MjQzQGdtYWlsLmNvbSIsInVzZXJfbmFtZSI6IlBtYXR0IiwiaWQiOjcwfQ.CO66prJSZkbdSdEAVQkSwAtGODAj_GDj1XzZa0wTZzk', // Replace with your actual access token
            'X-CSRFToken':
              'SRG8HzbflT8HUpSvUtCVwAskcDohXxssanZQT9XjmvPxSfs9AkTeLbeSqmtAVfSS',
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
        console.log('Transfer successful');
        // You can optionally reset form inputs here
      } else {
        // Handle error response
        console.error('Failed to make transfer:', response.statusText);
      }
    } catch (error) {
      // Handle fetch error
      console.error('Error making transfer:', error);
    }
  };

  return (
    <div>
      <div className="px-3 bg-white relative bottom-6 shadow-xl h-[25rem] w-[90%] translate-x-[-50%] left-1/2 m-0 rounded">
        <p className="px-3 py-5 border-b-[1px] border-[#00000010] mb-2 font-semibold text-[1.2rem]">
          Transfer Request
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
        </form>
      </div>
      <PricingPlan />
    </div>
  );
};

export default Transfer;
