import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Withdrawal = () => {
  const [showModal, setShowModal] = useState(false);
  const [walletAdded, setWalletAdded] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [usdtAmount, setUsdtAmount] = useState('');
  const [walletType, setWalletType] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [walletTypeError, setWalletTypeError] = useState(false);
  const [walletAddressError, setWalletAddressError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [withdrawalHistory, setWithdrawalHistory] = useState([]);

  useEffect(() => {
    // Fetch withdrawal history when component mounts
    fetchWithdrawalHistory();
  }, []); // Empty dependency array ensures this effect runs only once

  const fetchWithdrawalHistory = async () => {
    try {
      const response = await axios.get(
        'https://vaultcoin-production.up.railway.app/withdraw/user/withdraw/completed',
        {
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      );

      setWithdrawalHistory(response.data.withdraws);
    } catch (error) {
      console.error('Error fetching withdrawal history:', error.message);
    }
  };

  const handleAddWalletClick = (e) => {
    e.preventDefault();
    setShowModal(true);
    // Disable scrolling when modal is opened
    document.body.style.overflow = 'hidden';
  };

  const handleWalletAdded = (e) => {
    e.preventDefault();
    if (walletType && walletAddress) {
      setWalletAdded(true);
      setShowModal(false); // Close the modal after adding wallet
      // Enable scrolling when modal is closed
      document.body.style.overflow = 'auto';
    } else {
      if (!walletType) setWalletTypeError(true);
      if (!walletAddress) setWalletAddressError(true);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto';
  };

  const handleWithdrawalClick = (e) => {
    e.preventDefault();
    handleWithdrawalSubmit();
  };

  const handleWithdrawalSubmit = async () => {
    try {
      const response = await axios.post(
        'https://vaultcoin-production.up.railway.app/withdraw/',
        {
          amount: parseFloat(withdrawalAmount),
          wallet_type: walletType,
          wallet_address: walletAddress,
          usdt_amount: parseFloat(usdtAmount),
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
      setErrorMessage(error.response.data.UsdtAmount); // Set the error message state
    } finally {
    }
  };

  return (
    <div className="h-[100vh]">
      <div className=" flex justify-center relative bottom-[30rem]  z-50">
       
          <div className="mt-10">
            <p className="text-center my-3 font-semibold">Enter Amount *</p>
            <input type="text" className="w-[100%] rounded" />
          </div>
          <p className="text-center my-3 font-semibold">Select Wallet  *</p>
          <select
            name="walletType"
            value={walletType}
            onChange={(e) => {
              setWalletType(e.target.value);
              setWalletTypeError(false);
            }}
            className="w-[100%] rounded"
          >
            <option value="BTC">BTC</option>
            <option value="ETH">ETH</option>
            <option value="LTC">LTC</option>
            <option value="XRP">XRP</option>
            <option value="USDT">USDT</option>
            <option value="Account Balance">Account Balance</option>
          </select>
          {walletTypeError && (
            <p className="text-red-500 text-sm mt-1">
              Please select a wallet type
            </p>
          )}
       
      </div>
    </div>
  );
};

export default Withdrawal;
