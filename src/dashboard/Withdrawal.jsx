import React, { useState,useEffect } from 'react';
import PricingPlan from '../components/PricingPlan';
import { AUTH_TOKEN, CSRF_TOKEN } from './config';

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
      const response = await fetch(
        'https://vaultcoin-production.up.railway.app/withdraw/user/withdraw/completed',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: AUTH_TOKEN,
            'X-CSRFToken': CSRF_TOKEN,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch withdrawal history');
      }

      const data = await response.json();
      setWithdrawalHistory(data.withdraws);
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
      const response = await fetch(
        'https://vaultcoin-production.up.railway.app/withdraw/',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: AUTH_TOKEN,
            'X-CSRFToken': CSRF_TOKEN,
          },
          body: JSON.stringify({
            amount: parseFloat(withdrawalAmount),
            wallet_type: walletType,
            wallet_address: walletAddress,
            usdt_amount: parseFloat(usdtAmount),
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.UsdtAmount); // throw the error message
      }

      // Handle success
      console.log('Withdrawal successful');
    } catch (error) {
      console.error('Withdrawal error:', error.message);
      setErrorMessage(error.message); // Set the error message state
    } finally {
      // No need to clear the fields here
    }
  };

  return (
    <div className="h-[100vh]">
      <div className="shadow-xl py-5 px-5 max-lg:mt-10">
        <p className="text-xl my-5">Make Withdrawal</p>
        {walletAdded && (
          <form onSubmit={handleWithdrawalSubmit}>
            <div>
              <label htmlFor="">Enter Amount *</label>
              <input
                type="number"
                className="w-[100%] py-2 rounded h-[3rem]"
                value={withdrawalAmount}
                onChange={(e) => setWithdrawalAmount(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="">USDT Amount</label>
              <input
                type="text"
                className="w-[100%] py-2 rounded h-[3rem]"
                value={usdtAmount}
                onChange={(e) => setUsdtAmount(e.target.value)}
                required
              />
            </div>
            <div className="text-center my-5">
              {errorMessage && (
                <p className="text-red-500 mt-2">{errorMessage}</p>
              )}{' '}
              {/* Render error message */}
            </div>
            <div className="flex justify-center">
              <button
                className="font-normal mt-5 text-center transition-all duration-150 ease-in-out hover:bg-blue-700 cursor-pointer hover:text-white text-[#007bff] border-2 px-5 py-2 rounded border-[#007bff]"
                onClick={handleWithdrawalClick}
              >
                Withdraw
              </button>
            </div>
          </form>
        )}
        {!walletAdded && (
          <div className="flex justify-center">
            <button
              className="font-normal text-center transition-all duration-150 ease-in-out hover:bg-blue-700 cursor-pointer hover:text-white text-[#007bff] border-2 px-5 py-2 rounded border-[#007bff]"
              onClick={handleAddWalletClick}
            >
              Add Wallet
            </button>
          </div>
        )}
      </div>

      {withdrawalHistory.length > 0 && (
        <div className="mt-5">
          <p className="text-lg font-semibold mb-3">Completed Withdrawals</p>
          <ul>
            {withdrawalHistory.map((withdrawal, index) => (
              <li key={index}>
                Withdrawal Amount: {withdrawal.amount}, Wallet Type:{' '}
                {withdrawal.wallet_type}, Wallet Address:{' '}
                {withdrawal.wallet_address}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* <PricingPlan /> */}

      {showModal && (
        <div className=" flex justify-center relative bottom-[30rem]  z-50">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleWalletAdded}
          ></div>
          <form
            action=""
            className="fixed  transform shadow-lg top-[12rem] my-0 mx-auto w-[80%] bg-white rounded-lg p-8 z-60"
          >
            <p className="text-center my-3 font-semibold">
              Choose Wallet type *
            </p>
            <select
              name="walletType"
              value={walletType}
              onChange={(e) => {
                setWalletType(e.target.value);
                setWalletTypeError(false); // Reset error state
              }}
              className="w-[100%] rounded"
            >
              <option value="">Select Wallet Type</option>
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
            <div className="mt-10">
              <p className="text-center my-3 font-semibold">
                Enter Your Wallet Address *
              </p>
              <input
                type="text"
                value={walletAddress}
                onChange={(e) => {
                  setWalletAddress(e.target.value);
                  setWalletAddressError(false); // Reset error state
                }}
                className="w-[100%] rounded"
              />
              {walletAddressError && (
                <p className="text-red-500 text-sm mt-1">
                  Please enter your wallet address
                </p>
              )}
            </div>

            <div className="flex justify-between m-10">
              <button
                className="border-blue-500 border-2 rounded px-4 py-2"
                onClick={handleWalletAdded}
              >
                Add Wallet
              </button>
              <button
                className="border-blue-500 rounded border-2  px-4 py-2"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Withdrawal;
