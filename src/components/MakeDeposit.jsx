import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTH_TOKEN, CSRF_TOKEN } from '../dashboard/config';
import HandleDeposit from './HandleDeposit';

const MakeDeposit = () => {
  const [enteredAmount, setEnteredAmount] = useState('');
  const [usdtAmount, setUsdtAmount] = useState('');
  const [amountError, setAmountError] = useState('');
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [depositDate, setDepositDate] = useState('');
  const [depositTime, setDepositTime] = useState('');
  const [plans, setPlans] = useState([]);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://vaultcoin-production.up.railway.app/plans/',
          {
            headers: {
              accept: 'application/json',
              Authorization: AUTH_TOKEN,
              'X-CSRFToken': CSRF_TOKEN,
            },
          }
        );

        setPlans(response.data.plans);
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Error fetching plans:', error.response?.data);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchWalletAddress = async () => {
      try {
        const response = await axios.get(
          'https://vaultcoin-production.up.railway.app/walletaddress/',
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: AUTH_TOKEN,
              'X-CSRFToken': CSRF_TOKEN,
            },
          }
        );

        console.log('Bitcoin Address:', response.data.bitcoin_address);
        console.log('Ethereum Address:', response.data.etherum_address);
        console.log('Litecoin Address:', response.data.litecoin_address);
        console.log('Xrp Address:', response.data.xrp_address);
        console.log('Usdt Address:', response.data.usdt_address);
        console.log('Bal Address:', response.data.bal_address);

        const {
          bitcoin_address,
          etherum_address,
          litecoin_address,
          xrp_address,
          usdt_address,
          bal_address,
        } = response.data;
        console.log({ bitcoin_address });
        console.log({ etherum_address });

        switch (selectedWallet) {
          case 'btc':
            setWalletAddress(response.data.bitcoin_address);
            break;
          case 'eth':
            setWalletAddress(response.data.etherum_address);
            break;
          case 'ltc':
            setWalletAddress(response.data.litecoin_address);
            break;
          case 'xrp':
            setWalletAddress(response.data.xrp_address);
            break;
          case 'usdt':
            setWalletAddress(response.data.usdt_address);
            break;
          case 'bal':
            setWalletAddress(response.data.bal_address);
            break;
          default:
            setWalletAddress('');
        }
      } catch (error) {
        console.error('Error fetching wallet address:', error.response?.data);
        setWalletAddress(''); // Clear the wallet address in case of an error
        setErrorMessage('Error fetching wallet address. Please try again.');
      }
    };

    if (selectedWallet) {
      fetchWalletAddress();
    }
  }, [selectedWallet]);
  // Run when selectedWallet changes

  const handleDivClick = (walletType) => {
    setSelectedWallet(walletType === selectedWallet ? null : walletType);
  };

  const handleAmountChange = (event) => {
    const amount = event.target.value;
    setEnteredAmount(amount);
    setAmountError('');

   
    if (amount !== '') {
    
      setUsdtAmount(amount);
    } else {
      setUsdtAmount('');
    }
  };

  const handleDeposit = async () => {
    setLoading(true);
    try {
      if (!selectedWallet) {
        setErrorMessage('Please choose a payment method.');
        return;
      }

      if (!usdtAmount || isNaN(usdtAmount) || parseFloat(usdtAmount) <= 0) {
        setAmountError('Please enter a valid amount.');
        setLoading(false);
        return;
      }

      // Make sure there is a valid wallet address
      if (!walletAddress) {
        setErrorMessage(
          'Invalid wallet address for the selected payment method.'
        );
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 5000));

      const response = await axios.post(
        'https://vaultcoin-production.up.railway.app/deposit/',
        {
          amount: usdtAmount.toString(),
          wallet_type: 'USDT',
          wallet_address: walletAddress,
          usdt_amount: '',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: AUTH_TOKEN,
            'X-CSRFToken': CSRF_TOKEN,
          },
        }
      );

      setSuccessMessage('Deposit successful: ' + response.data.message);
      setErrorMessage('');

      const currentDate = new Date();
      console.log(currentDate);

      setDepositDate(currentDate.toLocaleDateString());
      setDepositTime(currentDate.toLocaleTimeString());
      console.log(currentDate.toLocaleTimeString());

      // Set wallet address
      console.log(setWalletAddress(response.data.wallet_address));

      navigate('/payment', {
        state: {
          amount: enteredAmount,
          date: depositDate,
          time: depositTime,
          walletAddress: response.data.wallet_address,
        },
      });
    } catch (error) {
      console.error('Deposit failed:', error);

      if (error.response) {
        if (error.response.status === 400) {
          // Handle 400 Bad Request errors
          console.error('Bad Request:', error.response.data);
          setErrorMessage(
            `Deposit failed: ${error.response.data.message || 'Unknown error'}`
          );
        } else {
          // Handle other types of errors
          console.error('Server responded with:', error.response.data);
          setErrorMessage(
            `Deposit failed: ${error.response.data.message || 'Unknown error'}`
          );
        }
      } else if (error.request) {
        // Handle request errors
        console.error('No response received. Request details:', error.request);
        setErrorMessage('No response received from the server.');
      } else {
        // Handle other errors
        console.error('Error setting up the request:', error.message);
        setErrorMessage('Error setting up the request. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded shadow-xl min-h-[100vh] gap-3 flex w-[90%]  bg-white pb-10 max-lg:flex-wrap max-lg:w-[80%] max-sm:w-[100%]">
      {plans.map((plan) => (
        <div key={plan.id} className=" w-[100%] mx-auto my-0">
          <div className="bg-blue-700 p-5 rounded-xl before:w-full min-h-[40vh]">
            <p className="text-[1.2rem] font-semibold text-white mb-3">
              {plan.name}
            </p>
            <button className="text-black cursor-auto rounded-xl px-2 py-1">
              {plan.category}
            </button>
          </div>

          <div className="flex justify-between p-5 items-center">
            <ul className="leading-10 w-[100%] px-5">
              <li className='flex w-[100%] justify-between'><span>Min Deposit:</span> <span>${plan.minimum_amount}</span></li>
              <li className='flex w-[100%] justify-between'><span>Max Deposit:</span> <span> ${plan.maximum_amount}</span></li>
              <li className='flex w-[100%] justify-between'><span>Daily Profit:</span> <span> {plan.investment_profit_percent}%</span></li>
              <li className='flex w-[100%] justify-between'><span>Referral Bonus:</span> <span> {plan.referral_profit_percent}%</span></li>
              <li className='flex w-[100%] justify-between'><span>Duration:</span> <span> {plan.number_of_days} Day(s)</span></li>
            </ul>
          </div>
          <HandleDeposit/>
        </div>
      ))}
      <div className="ml-5">
        {successMessage && (
          <p className="text-green-500 mt-3 px-5">{successMessage}</p>
        )}
        {errorMessage && <p className="text-red-500 mt-3">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default MakeDeposit;
