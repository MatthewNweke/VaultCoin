import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PricingPlan from '../components/PricingPlan';

const Withdrawal = () => {
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [usdtAmount, setUsdtAmount] = useState('');
  const [walletType, setWalletType] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [walletTypes, setWalletTypes] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState('');

  useEffect(() => {
    fetchWalletTypes();
  }, []); 

  // Fetch wallet types from the API
  const fetchWalletTypes = async () => {
    try {
      const response = await axios.get(
        'https://example.com/api/user/1', // Replace with your API endpoint
        {
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      );

      const userWallets = response.data;
      const types = Object.keys(userWallets[0]).filter(key => key.endsWith('_address'));
      setWalletTypes(types);
      if (types.length > 0) {
        setWalletType(types[0]); // Select the first wallet type by default
      }
    } catch (error) {
      console.error('Error fetching wallet types:', error.message);
    }
  };

  // Handle the submission of a new withdrawal
  const handleWithdrawalSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://vaultcoin-production.up.railway.app/withdraw/',
        {
          amount: withdrawalAmount,
          wallet_type: walletType,
          wallet_address: walletAddress,
          usdt_amount: usdtAmount,
        },
        {
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      );

      // Handle success
      console.log('Withdrawal successful');
    } catch (error) {
      console.error('Withdrawal error:', error.message);
      setErrorMessage(error.response?.data?.UsdtAmount || 'An error occurred during withdrawal');
    }
  };

  return (
    <div className="w-full shadow-xl px-5 py-2">
      <div className="flex flex-col justify-center items-center h-full">
        <form action="" className="rounded-lg p-8 w-full">
          <div className="mt-10">
            <p className="my-3 font-semibold">Enter Amount *</p>
            <input
              type="text"
              value={withdrawalAmount}
              onChange={(e) => setWithdrawalAmount(e.target.value)}
              className="w-full rounded"
            />
          </div>

          <div className="mt-5">
            <p className="my-3 font-semibold">Select Wallet Type *</p>
            <select
              name="walletType"
              value={walletType}
              onChange={(e) => setWalletType(e.target.value)}
              className="w-full rounded"
            >
              {/* {walletTypes.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))} */}

              <option value="">Select wallet</option>
              <option value="BTC">BTC</option>
            </select>
          </div>

          <div className="mt-5">
            <p className="my-3 font-semibold">Enter Wallet Address *</p>
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="w-full rounded"
            />
          </div>

          <div className="mt-5">
            <p className="my-3 font-semibold">Enter USDT Amount *</p>
            <input
              type="text"
              value={usdtAmount}
              onChange={(e) => setUsdtAmount(e.target.value)}
              className="w-full rounded"
            />
          </div>

          <button className="transform -translate-x-1/2 relative left-1/2 mt-10 px-3 py-2 bg-blue-500 text-white" onClick={handleWithdrawalSubmit}>
            Withdraw
          </button>

          {errorMessage && <p className="text-red-500 text-center mt-3">{errorMessage}</p>}
        </form>

        <PricingPlan />
      </div>
    </div>
  );
};

export default Withdrawal;
