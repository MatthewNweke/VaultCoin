import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MakeDeposit = () => {
  const [enteredAmount, setEnteredAmount] = useState('');
  const [amountError, setAmountError] = useState('');
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchWalletAddress = async () => {
      try {
        const token =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA2OTI3NTQ2LCJpYXQiOjE3MDY4MTk1NDYsImp0aSI6IjdhMGUzNWM0NzE2YjQxMTg4N2FlNTUxMmEwNjgzZGRhIiwidXNlcl9pZCI6NzAsImZpcnN0X25hbWUiOiJOV0VLRSIsImVtYWlsIjoibndla2VtYXR0aGV3MjQzQGdtYWlsLmNvbSIsInVzZXJfbmFtZSI6IlBtYXR0IiwiaWQiOjcwfQ.MQaJKC_588b74j2N4ao3H56YOKpHEIhhcrhN98jj2Fc'; // Replace with your actual access token

        const response = await axios.get(
          'https://vaultcoin-production.up.railway.app/walletaddress/',
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log('Bitcoin Address:', response.data.bitcoin_address);
        console.log('Ethereum Address:', response.data.etherum_address);
        console.log('Litecoin Address:', response.data.litecoin_address);
        console.log('Litecoin Address:', response.data.litecoin_address);
        // Extract the wallet address based on the selected wallet type

        const { bitcoin_address, etherum_address, litecoin_address, xrp_address, usdt_address, bal_address } = response.data;

        switch (selectedWallet) {
          case 'btc':
            setWalletAddress(response.data.wallet_type);
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
    setEnteredAmount(event.target.value);
    setAmountError('');
  };

  const handleDeposit = async () => {
    try {
      if (!selectedWallet) {
        setErrorMessage('Please choose a payment method.');
        return;
      }
      if (!enteredAmount || isNaN(enteredAmount) || parseFloat(enteredAmount) <= 0) {
        setAmountError('Please enter a valid amount.');
        setLoading(false);
        return;
      }

      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA2OTI3NTQ2LCJpYXQiOjE3MDY4MTk1NDYsImp0aSI6IjdhMGUzNWM0NzE2YjQxMTg4N2FlNTUxMmEwNjgzZGRhIiwidXNlcl9pZCI6NzAsImZpcnN0X25hbWUiOiJOV0VLRSIsImVtYWlsIjoibndla2VtYXR0aGV3MjQzQGdtYWlsLmNvbSIsInVzZXJfbmFtZSI6IlBtYXR0IiwiaWQiOjcwfQ.MQaJKC_588b74j2N4ao3H56YOKpHEIhhcrhN98jj2Fc'; // Replace with your actual access token

      // Make sure there is a valid wallet address
      if (!walletAddress) {
        setErrorMessage(
          'Invalid wallet address for the selected payment method.'
        );
        return;
      }

      const response = await axios.post(
        'https://vaultcoin-production.up.railway.app/deposit/',
        {
          amount: enteredAmount,
          wallet_type: selectedWallet,
          wallet_address: walletAddress,
          usdt_amount: enteredAmount, // Assuming enteredAmount is also the USDT amount
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage('Deposit successful: ' + response.data.message);
      setErrorMessage('');
      // Use navigate to redirect to '/payment' on successful deposit
      navigate('/payment');
    } catch (error) {
      console.error('Deposit failed:', error.response.data);
      setErrorMessage('Deposit failed: ' + error.response.data.message);
      setSuccessMessage('');
    }
    finally {
      setLoading(false); // Set loading to false after the API request completes
    }
  };

  return (
    <div className="rounded shadow-xl min-h-[100vh] bg-white w-[30%] pb-10 max-xl:w-[60%] max-lg:w-[70%] max-md:w-[80%] max-sm:w-[100%]">
      <div className="bg-blue-700 p-5 rounded-xl before:w-full min-h-[40vh]">
        <p className="text-[1.2rem] font-semibold text-white mb-3">Standard</p>
        <button className="text-black cursor-auto rounded-xl px-2 py-1">
          Real Estate
        </button>
      </div>

      <div className="flex justify-between p-5 items-center">
        <ul className="leading-10">
          <li>Min Deposit</li>
          <li>Max Deposit</li>
          <li>Daily Profit</li>
          <li>Referral Bonus</li>
          <li>Duration</li>
        </ul>
        <ul className="leading-10">
          <li>$10,000.00</li>
          <li>$19,999.00</li>
          <li>1.5%</li>
          <li>5%</li>
          <li>6 Month(s)</li>
        </ul>
      </div>

      <form action="" className="px-5">
        <label htmlFor="" className="text-center mb-3 block font-semibold">
          Enter Amount: <span className="text-[#F25961]">*</span>
        </label>
        <input
          type="number"
          className="w-[100%]"
          placeholder="0000.00"
          value={enteredAmount}
          onChange={handleAmountChange}
        />

        {amountError && (
          <p className="text-red-500 text-sm mt-1">{amountError}</p>
        )}
        <label htmlFor="" className="mt-5 text-center block font-semibold">
          Choose payment method
        </label>
      </form>

      <div>
        <div className="flex justify-between p-5 gap-10">
          <div
            className={`border-black border-[1px] p-5 rounded-lg cursor-pointer relative ${
              selectedWallet === 'btc' ? 'border-[3px] border-blue-500' : ''
            }`}
            onClick={() => handleDivClick('btc')}
          >
            <img src="/btc.png" alt="" className="w-25 h-20" />
          </div>
          <div
            className={`border-black border-[1px] p-5 rounded-lg cursor-pointer relative ${
              selectedWallet === 'eth' ? 'border-[3px] border-blue-500' : ''
            }`}
            onClick={() => handleDivClick('eth')}
          >
            <img src="/eth.png" alt="" className="w-25 h-20" />
          </div>
        </div>
        <div className="flex justify-between p-5 gap-10">
          <div
            className={`border-black border-[1px] p-5 rounded-lg cursor-pointer relative ${
              selectedWallet === 'ltc' ? 'border-[3px] border-blue-500' : ''
            }`}
            onClick={() => handleDivClick('ltc')}
          >
            <img src="/ltc.png" alt="" className="w-25 h-20" />
          </div>
          <div
            className={`border-black border-[1px] p-5 rounded-lg cursor-pointer relative ${
              selectedWallet === 'xrp' ? 'border-[2px] border-blue-500' : ''
            }`}
            onClick={() => handleDivClick('xrp')}
          >
            <img src="/xrp.png" alt="" className="w-25 h-20" />
          </div>
        </div>
        <div className="flex justify-between p-5 gap-10">
          <div
            className={`border-black border-[1px] p-5 rounded-lg cursor-pointer relative ${
              selectedWallet === 'usdt' ? 'border-[2px] border-blue-500' : ''
            }`}
            onClick={() => handleDivClick('usdt')}
          >
            <img src="/usdt.png" alt="" className="w-25 h-20" />
          </div>
          <div
            className={`border-black border-[1px] p-5 rounded-lg cursor-pointer relative ${
              selectedWallet === 'bal' ? 'border-[3px] border-blue-500' : ''
            }`}
            onClick={() => handleDivClick('bal')}
          >
            <img src="/bal.png" alt="" className="w-25 h-20" />
          </div>
        </div>
      </div>

      <button
        className="bg-gradient-to-br text-white relative left-[50%] -translate-x-1/2 from-gray-800 to-gray-900 w-[90%] rounded-lg py-3 px-10"
        onClick={handleDeposit}
        disabled={loading}

      >
        {loading ? 'Processing...' : 'Make Deposit'}
      </button>

      {successMessage && (
        <p className="text-green-500 mt-3">{successMessage}</p>
      )}
      {errorMessage && <p className="text-red-500 mt-3">{errorMessage}</p>}
    
    </div>
  );
};

export default MakeDeposit;
