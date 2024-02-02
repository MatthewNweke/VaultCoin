import React, { useEffect, useState } from 'react';
import PricingPlan from '../components/PricingPlan';

const Deposits = () => {
  const [deposits, setDeposits] = useState([]);

  useEffect(() => {
    // Function to fetch deposits from the API
    const fetchDeposits = async () => {
      try {
        const response = await fetch(
          'https://vaultcoin-production.up.railway.app/deposit/',
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA2NzEzODQyLCJpYXQiOjE3MDY2MDU4NDIsImp0aSI6IjhjN2QyNTU5ODZiNDQwNGU4NTQxYTYwYjk1ODIwNWQ4IiwidXNlcl9pZCI6ODksImZpcnN0X25hbWUiOiJNYXR0aGV3IiwiZW1haWwiOiJud2VrZW1hdHRoZXcyNDc4M0BnbWFpbC5jb20iLCJ1c2VyX25hbWUiOiJqb2huX2RvZSIsImlkIjo4OX0.B2nQnPPd4J2lNjE5m9qbanuSKWtKtd1vWQqfJrkT6v4', // Replace with your actual access token
              'X-CSRFToken':
                'tCUFhUh0aiPJhnOl7pWaOrNGNmEkxrCZL8dntu34bUwzfdoZNgdt32ze15JDv92p',
            },
          }
        );

        if (response.ok) {
          const depositData = await response.json();
          setDeposits(depositData);
        } else {
          console.error('Failed to fetch deposits');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    // Call the fetchDeposits function
    fetchDeposits();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div className=" ">
      <div className="text-white bg-gradient-to-br rounded h-[8rem] my-0 mx-auto ">
        <p className="px-3 py-5 font-semibold text-[1.2rem] text-black shadow-xl text-center max-xl:py-10">
          Deposit
        </p>
      </div>
      <div className="px-3 bg-white relative bottom-6 h-[10rem] w-[90%] translate-x-[-50%] left-1/2 m-0 rounded shadow-lg max-xl:w-[100%]">
        <p className="px-3 py-5 border-b-[1px] border-[#00000010] mb-2 font-semibold text-[1.2rem] ">
          Make Deposit
        </p>
        <select name="deposit" id="" className="w-[100%] cursor-pointer">
          <option value="deposit" className="py-5">
            Choose type of deposit
          </option>
          <option value="deposit">Real estate</option>
          <option value="deposit">Crypto Mining</option>
        </select>
      </div>

      <div className="px-3 mt-5111 bg-white relative bottom-6 h-[10rem] w-[90%] translate-x-[-50%] left-1/2 m-0 rounded shadow-lg max-xl:w-[100%]">
        <p className=" py-5  font-semibold text-[1.2rem] ">Deposit History</p>
        {deposits.map((deposit) => (
          <div
            key={deposit.id}
            className="bg-[#00000020] rounded h-[35%] py-8 flex justify-around items-center cursor-pointer hover:bg-[#00000010]  "
          >
            <div>
              <p>{`Deposit#${deposit.id}`}</p>{' '}
              <p className="text-[0.5rem]">{deposit.date}</p>
            </div>
            <p>{`$${deposit.amount.toFixed(2)}`}</p>
            <p
              className={`font-bold ${
                deposit.status === 'pending' ? 'text-red-500' : 'text-green-500'
              }`}
            >
              {deposit.status}
            </p>
          </div>
        ))}
      </div>

      {/* Hot pricing plans */}
      <PricingPlan />
    </div>
  );
};

export default Deposits;
