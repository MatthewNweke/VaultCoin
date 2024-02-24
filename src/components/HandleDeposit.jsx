import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HandleDeposit = () => {
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

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://vaultcoin-production.up.railway.app/plans/',
          {
            headers: {
              Accept: 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('token')
            },
          }
        );

       
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
              Accept: 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('token')
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
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token')
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
    <div>
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
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="w-6 h-6 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
            <span className="ml-2">Processing...</span>
          </div>
        ) : (
          'Make Deposit'
        )}
      </button>
    </div>
  );
};

export default HandleDeposit;
