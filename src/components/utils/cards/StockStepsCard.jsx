import { useState } from 'react';
import Modal from './Modal';

const StockStepsCard = ({ title, returns, daily, total, amount }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div
      className="w-[18rem] shadow-md rounded-lg px-7 py-5 flex flex-col justify-between bg-white"
      style={{
        border: '2px solid #f3f4f6',
        height: '26rem',
      }}
    >
      <div className="mb-[1rem] text-center">
        <p className="font-semibold text-xl mb-3 text-blue-700 max-md:text-[1.3rem] max-sm:text-[1rem]">
          {title}
        </p>
        <p className="font-medium text-base text-[#000]  border-t-[1px] border-b-[1px] py-2 px-5 border-gray-300">
          {returns}
        </p>
        <p className="font-medium text-base text-[#000] border-t-[1px] border-b-[1px] py-2 px-5 border-gray-300">
          Everyday
        </p>
        <p className="font-medium text-base text-[#000] border-t-[1px] border-b-[1px] py-2 px-5 border-gray-300">
          {daily}
        </p>
        <p className="font-medium text-base text-[#000] border-t-[1px] border-b-[1px] py-2 px-5 border-gray-300">
          {total}
        </p>
        <div className="mt-10 text-center flex flex-col gap-5 items-center">
          <p className="font-medium  text-blue-500  text-lg">{amount}</p>
          <button
            className="bg-blue-700 text-white   py-2 rounded-[0.4rem] w-[50%]"
            onClick={openModal}
          >
            Invest now
          </button>
          {isModalOpen && <Modal isOpen={isModalOpen} onClose={closeModal} />}
        </div>
      </div>
    </div>
  );
};

export default StockStepsCard;
