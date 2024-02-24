import { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios


const Transaction = () => {
  const [deposits, setDeposits] = useState([]);

  useEffect(() => {
    const fetchDeposits = async () => {
      try {
        const response = await axios.get('https://vaultcoin-production.up.railway.app/deposit/', {
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token')
          },
        });

        if (response.status !== 200) {
          throw new Error('Failed to fetch deposits');
        }

        setDeposits(response.data);
      } catch (error) {
        console.error('Error fetching deposits:', error.message);
      }
    };

    fetchDeposits();
  }, []);

  return (
    <div>
      <div className="px-3 mt-5111 bg-white relative bottom-6 py-3 w-[90%] translate-x-[-50%] left-1/2 m-0 rounded shadow-lg">
        <p className=" py-5  font-semibold text-[1.2rem] ">All Transactions</p>
        {deposits.map((deposit) => (
          <div
            key={deposit.id}
            className={`bg-${deposit.verified ? 'blue' : '[#00000020]'} rounded h-[5rem] py-8 flex justify-around items-center cursor-pointer hover:bg-[#00000010]`}
          >
            <div>
              <p>Deposit#{deposit.id}</p>{' '}
              <p className="text-[0.5rem]">{deposit.created}</p>
            </div>
            <p>{`$${deposit.amount}`}</p>
            <p className={`font-bold ${deposit.verified ? 'text-white' : ''}`}>{deposit.verified ? 'Success' : 'Pending'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transaction;
