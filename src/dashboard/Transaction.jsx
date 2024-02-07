import PricingPlan from '../components/PricingPlan';
import {useState,useEffect} from 'react'

const Transaction = () => {

  const [deposits, setDeposits] = useState([]);

  useEffect(() => {
    const fetchDeposits = async () => {
      try {
        const response = await fetch('https://vaultcoin-production.up.railway.app/deposit/', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA3MzYyNTE0LCJpYXQiOjE3MDcyNTQ1MTQsImp0aSI6ImJmMTg2ZTViZTljMjRkNTI4MjZmZjkzNzBmMDY4NjA0IiwidXNlcl9pZCI6NzAsImZpcnN0X25hbWUiOiJOV0VLRSIsImVtYWlsIjoibndla2VtYXR0aGV3MjQzQGdtYWlsLmNvbSIsInVzZXJfbmFtZSI6IlBtYXR0IiwiaWQiOjcwfQ.CO66prJSZkbdSdEAVQkSwAtGODAj_GDj1XzZa0wTZzk', // Replace with your actual access token
          'X-CSRFToken':
            'SRG8HzbflT8HUpSvUtCVwAskcDohXxssanZQT9XjmvPxSfs9AkTeLbeSqmtAVfSS'
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch deposits');
        }

        const data = await response.json();
        setDeposits(data);
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

      <PricingPlan />
    </div>
  );
};

export default Transaction;
