import { useState } from 'react';
import PricingPlan from '../components/PricingPlan';

const Withdrawal = () => {
  const [showModal, setShowModal] = useState(false);

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

  return (
    <div className="">
      <div className="shadow-xl py-5 px-5 max-lg:mt-10">
        <p className="text-xl my-5">Make Withdrawal</p>
        <form action="">
          <label htmlFor="">Enter Amount *</label>
          <input type="number" className="w-[100%] py-2 rounded h-[3rem]" />
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleCloseModal}
          ></div>
          <form
            action=""
            className="fixed  transform shadow-lg top-[20rem] w-[80%] bg-white rounded-lg p-8 z-60"
          >
           <select name="" id="" className='w-[100%] rounded'>
            <option value="">Bitcoin</option>
            <option value="">Ethereum</option>
            <option value="">Litecoin</option>
            <option value="">Ripple(XRP)</option>
            <option value="">Tether(Usdt)</option>
            <option value="">Account Balance</option>
           </select>
            <button className="text-blue-500 mt-5" onClick={handleCloseModal}>
              Close
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Withdrawal;
