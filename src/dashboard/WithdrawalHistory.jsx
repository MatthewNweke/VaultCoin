import React, { useState, useEffect } from 'react';
import WithdrawalDeleteButton from './WithdrawalDeleteButton';

const WithdrawalHistory = () => {
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    // Fetch withdrawal history from the API
    const fetchWithdrawals = async () => {
      try {
        const response = await fetch(
          'https://vaultcoin-production.up.railway.app/withdraw/',
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('token')
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setWithdrawals(data);
        } else {
          console.error('Failed to fetch withdrawal history');
        }
      } catch (error) {
        console.error('Error fetching withdrawal history:', error);
      }
    };

    fetchWithdrawals();
  }, []); // Empty dependency array to fetch data only once on component mount

  return (
    <div>
      <div className="px-3 mt-5111 bg-white relative bottom-6 py-3 w-[90%] translate-x-[-50%] left-1/2 m-0 rounded shadow-lg">
        <p className="py-5 font-semibold text-[1.2rem]">All Transactions</p>
        {withdrawals.map((withdrawal, index) => (
          <div
            key={index}
            className="bg-[#00000020] rounded h-[5rem] py-8 flex justify-around items-center cursor-pointer hover:bg-[#00000010]"
          >
            <div>
              <p>Withdrawal#{withdrawal.id}</p>
                <WithdrawalDeleteButton withdrawalId={withdrawal.id} />
              <p className="text-[0.5rem]">{withdrawal.timestamp}</p>
            </div>
            <p>{withdrawal.amount}</p>
            <p className="font-bold">{withdrawal.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WithdrawalHistory;
