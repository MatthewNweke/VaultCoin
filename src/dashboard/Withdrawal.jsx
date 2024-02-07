import { useState } from 'react';
import PricingPlan from '../components/PricingPlan';

const Withdrawal = () => {
  const [showModal, setShowModal] = useState(false);

  const handleAddWalletClick = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="shadow-xl py-5 px-5">
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
          <div className="fixed  transform flex justify-center items-center top-[10rem] w-[50%] bg-white rounded-lg p-8 z-60">
            <div className='w-[100%]'>Modal Content Goes Here</div>
            <button className="text-blue-500" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Withdrawal;
