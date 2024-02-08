import { useState } from 'react';
import PricingPlan from '../components/PricingPlan';

const Withdrawal = () => {
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [walletType, setWalletType] = useState('');
  const [walletAddress, setWalletAddress] = useState('');

  const handleAddWalletClick = (e) => {
    e.preventDefault();
    setShowModal(true);
    // Disable scrolling when modal is opened
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // Enable scrolling when modal is closed
    document.body.style.overflow = 'auto';
  };

  const handleWithdrawal = async (e) => {
    e.preventDefault();

    const requestBody = {
      amount: parseFloat(amount), // Convert amount to a number
      wallet_type: walletType,
      wallet_address: walletAddress,
      usdt_amount: parseFloat(amount) // Assuming usdt_amount is same as amount
    };

    try {
      const response = await fetch('https://vaultcoin-production.up.railway.app/withdraw/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA3NTA3NDc2LCJpYXQiOjE3MDczOTk0NzYsImp0aSI6IjQxMDRhMTgxZWE0NDRmZjM4NjNjYjhlZDQ1YTc4MTcxIiwidXNlcl9pZCI6NzAsImZpcnN0X25hbWUiOiJOV0VLRSIsImVtYWlsIjoibndla2VtYXR0aGV3MjQzQGdtYWlsLmNvbSIsInVzZXJfbmFtZSI6IlBtYXR0IiwiaWQiOjcwfQ.bJIW4fqMty9M5E8um5P2GqlXOVNwR3QYNyGHmvwgSLo',
          'X-CSRFToken': '65XKnQB4K8OJoyQUDGiT3e2f8M2kRK7PoBgszqn8LKvzmoqyjxzciPONmv7DPsxf'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to withdraw');
      }

      // Withdrawal successful, handle accordingly
      console.log('Withdrawal successful');
    } catch (error) {
      console.error('Withdrawal error:', error.message);
      // Handle error, show error message to user, etc.
    }
  };

  return (
    <div className="">
      <div className="shadow-xl py-5 px-5 max-lg:mt-10">
        <p className="text-xl my-5">Make Withdrawal</p>
        <form onSubmit={handleWithdrawal}>
          <label htmlFor="">Enter Amount *</label>
          <input type="number" className="w-[100%] py-2 rounded h-[3rem]" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <p className="my-5">
            Please add a wallet address where to receive your withdrawal
          </p>
          <div className="flex justify-center">
            <button
              className="font-normal text-center transition-all duration-150 ease-in-out hover:bg-blue-700 cursor-pointer hover:text-white text-[#007bff] border-2 px-5 py-2 rounded border-[#007bff]"
              onClick={handleAddWalletClick}
            >
              Add Wallet
            </button>
          </div>
        </form>
      </div>
      <PricingPlan />

      {showModal && (
        <div className=" flex justify-center relative bottom-[30rem]  z-50">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleCloseModal}
          ></div>
          <form
            action=""
            className="fixed  transform shadow-lg top-[12rem] my-0 mx-auto w-[80%] bg-white rounded-lg p-8 z-60"
          >
            <p className="text-center my-3 font-semibold">
              Choose Wallet type *
            </p>
            <select name="" id="" className="w-[100%] rounded" value={walletType} onChange={(e) => setWalletType(e.target.value)}>
              <option value="bitcoin">Bitcoin</option>
              <option value="ethereum">Ethereum</option>
              <option value="litecoin">Litecoin</option>
              <option value="ripple">Ripple(XRP)</option>
              <option value="USDT">Tether(USDT)</option>
              <option value="balance">Account Balance</option>
            </select>
            <div className='mt-10'>
              <p className="text-center my-3 font-semibold">
                Enter Your Wallet Address *
              </p>
              <input type="text" className="w-[100%] rounded" value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} />
            </div>

            <div className='flex justify-between mt-10'>
              <button type="submit" className='border-blue-500 border-2 rounded px-4 py-2'>Add Wallet</button>
              <button className='border-blue-500 rounded border-2  px-4 py-2' onClick={handleCloseModal}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Withdrawal;
