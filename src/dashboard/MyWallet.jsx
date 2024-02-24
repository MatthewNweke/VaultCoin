import { useState, useEffect } from 'react';
import PricingPlan from '../components/PricingPlan';

const MyWallet = () => {
  const [showModal, setShowModal] = useState(false);
  const [walletType, setWalletType] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [walletTypeError, setWalletTypeError] = useState(false);
  const [walletAddressError, setWalletAddressError] = useState(false);
  const [wallets, setWallets] = useState(() => {
    // Load wallets from local storage on component mount
    const storedWallets = localStorage.getItem('wallets');
    return storedWallets ? JSON.parse(storedWallets) : [];
  });

  useEffect(() => {
    // Save wallets to local storage whenever it changes
    localStorage.setItem('wallets', JSON.stringify(wallets));
  }, [wallets]);

  // Function to handle "Add my Wallet" button click
  const handleAddWalletClick = (e) => {
    e.preventDefault();
    setShowModal(true);
    // Disable scrolling when modal is opened
    document.body.style.overflow = 'hidden';
  };

  // Function to handle wallet addition
  const handleWalletAdded = (e) => {
    e.preventDefault();
    if (walletType && walletAddress) {
      // Add the new wallet to the wallets state
      setWallets((prevWallets) => [
        ...prevWallets,
        { type: walletType, address: walletAddress },
      ]);
      // Reset input fields and errors
      setWalletType('');
      setWalletAddress('');
      setWalletTypeError(false);
      setWalletAddressError(false);
      setShowModal(false); // Close the modal after adding wallet
      // Enable scrolling when modal is closed
      document.body.style.overflow = 'auto';
    } else {
      if (!walletType) setWalletTypeError(true);
      if (!walletAddress) setWalletAddressError(true);
    }
  };

  // Function to handle cancellation of wallet addition
  const handleCancel = () => {
    // Reset input fields and errors
    setWalletType('');
    setWalletAddress('');
    setWalletTypeError(false);
    setWalletAddressError(false);
    setShowModal(false);
    // Enable scrolling when modal is closed
    document.body.style.overflow = 'auto';
  };

  // Function to handle deletion of wallet address
  const handleDeleteWallet = (index) => {
    const updatedWallets = [...wallets];
    updatedWallets.splice(index, 1);
    setWallets(updatedWallets);
  };

  return (
    <div className="h-screen flex flex-col justify-between">
      <div className="shadow-xl py-5 px-5 max-lg:mt-10">
        <p className="text-xl my-5">My Wallets</p>

        {wallets.map((wallet, index) => (
          <div key={index} className="flex items-center justify-between mb-4">
            <p>
              {wallet.type}: {wallet.address}
            </p>
            <button
              className="text-red-500"
              onClick={() => handleDeleteWallet(index)}
            >
              Delete
            </button>
          </div>
        ))}

        {!showModal && (
          <div className="flex justify-center">
            <button
              className="font-normal text-center transition-all duration-150 ease-in-out hover:bg-blue-700 cursor-pointer hover:text-white text-[#007bff] border-2 px-5 py-2 rounded border-[#007bff]"
              onClick={handleAddWalletClick}
            >
              Add my Wallet
            </button>
          </div>
        )}
      </div>

      {/* Display modal if showModal state is true */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 w-96">
            <p className="text-center font-semibold mb-3">Add Wallet</p>
            {/* Wallet type selection */}
            <select
              name="walletType"
              value={walletType}
              onChange={(e) => {
                setWalletType(e.target.value);
                setWalletTypeError(false); // Reset error state
              }}
              className="w-full rounded border border-gray-300 p-2 mb-3"
            >
              <option value="">Select Wallet Type</option>
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
              <option value="LTC">LTC</option>
              <option value="XRP">XRP</option>
              <option value="USDT">USDT</option>
              <option value="Account Balance">Account Balance</option>
            </select>
            {/* Wallet address input */}
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => {
                setWalletAddress(e.target.value);
                setWalletAddressError(false); // Reset error state
              }}
              className="w-full rounded border border-gray-300 p-2 mb-3"
              placeholder="Enter Wallet Address"
            />
            {/* Error messages */}
            {walletTypeError && (
              <p className="text-red-500 text-sm mb-3">
                Please select a wallet type
              </p>
            )}
            {walletAddressError && (
              <p className="text-red-500 text-sm mb-3">
                Please enter your wallet address
              </p>
            )}
            {/* Buttons */}
            <div className="flex justify-between">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleWalletAdded}
              >
                Add my Wallet
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <PricingPlan />
    </div>
  );
};

export default MyWallet;
