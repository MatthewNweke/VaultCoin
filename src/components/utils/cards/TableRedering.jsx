import React, { useState } from 'react';
import TransactionTable from './TransactionTable';

const Table = (props) => {
  const [selectedOption, setSelectedOption] = useState('deposit');

  const handleButtonClick = (option) => {
    setSelectedOption(option);
  };

  const renderTableRows = () => {
    return (
      <>

        {selectedOption === 'deposit' ? (
          <>
            <tr className='px-3 font-semibold mb-3'>Latest Deposit</tr>
            {/* <p>pejfpjfpjpfj</p> */}
            <TransactionTable

            />
          </>
        ) : (
          <>
            <tr className='px-3 font-semibold'>Latest Withdrawal</tr>
            <TransactionTable

            />

          </>
        )}
      </>
    );
  };

  return (
    <div>
      <div className="flex gap-4 justify-center mt-8 max-sm:flex-col items-center max-sm:gap-10">
        <button
          className="text-[black] font-bold py-3 px-4 max-sm:text-[0.8rem] max-sm:w-[50%]"
          onClick={() => handleButtonClick('deposit')}
        >
          Latest Deposit
        </button>
        <button
          className="text-[white] bg-blue-700 font-bold py-3 px-4 border-[1px] border-blue-600  max-sm:text-[0.8rem] max-sm:w-[50%]"
          onClick={() => handleButtonClick('withdrawal')}
        >
          Latest Withdrawal
        </button>
      </div>

      <div className="rounded-lg w-[80%] mx-auto max-lg:w-[90%]  max-md:w-[100%]">
        <table className="w-[100%] h-[20rem]  max-sm:w-[100%] ">
          <thead>
            <tr className="bg-blue-700  h-12 rounded-lg">
              {/* Add your table header cells here */}
            </tr>
          </thead>
          <tbody>{renderTableRows()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
