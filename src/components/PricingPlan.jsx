import { React, useState } from 'react';
import { Link } from 'react-router-dom';

const PricingPlan = () => {
  const [enteredAmount, setEnteredAmount] = useState('');
  const [amountError, setAmountError] = useState('');

  const handleAmountChange = (event) => {
    setEnteredAmount(event.target.value);
    setAmountError('');
  };

  const handleDepositClick = () => {
    if (parseInt(enteredAmount, 10) < 10000) {
      setAmountError('Minimum amount is $10,000');
    } else {
      
      setAmountError('Minimum amount is $10,000');
    }
  };

  return (
    <div className="flex gap-[5%] flex-wrap justify-center items-center mt-10 max-xl:flex-col max-xl:gap-[10%]">
      <div className="rounded shadow-xl min-h-[100vh] bg-white w-[30%] pb-10 max-xl:w-[60%] max-lg:w-[70%] max-md:w-[80%] max-sm:w-[100%]">
        <div class=" bg-green-500 p-5 rounded-xl before:w-full min-h-[40vh] ">
          <p className="text-[1.2rem] font-semibold text-white mb-3">
            Standard
          </p>
          <button className="text-black cursor-auto rounded-xl px-2 py-1">
            Real Estate
          </button>
        </div>

        <div className="flex justify-between p-5 items-center">
          <ul className="leading-10">
            <li>Min Deposit</li>
            <li>Max Deposit</li>
            <li>Daily Profit</li>
            <li>Referral Bonus</li>
            <li>Duration</li>
          </ul>
          <ul className="leading-10">
            <li>$10,000.00</li>
            <li>$19,999.00</li>
            <li>1.5%</li>
            <li>5%</li>
            <li>6 Month(s)</li>
          </ul>
        </div>
        <form action="" className="px-5">
          <label htmlFor="" className="text-center mb-3 block font-semibold">
            Enter Amount: <span className="text-[#F25961]">*</span>
          </label>
          <input
            type="number"
            className="w-[100%] "
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
            <div className=" border-black border-[1px] p-5 rounded-lg cursor-pointer relative">
              <input
                type="checkbox"
                name=""
                id=""
                className="absolute -top-1 p-3  left-0 rounded-[50%] bg-green-500 border-black form-checkbox text-white-500 checked:bg-green-500 border-0 checked:border-none"
              />
              <img src="/btc.png" alt="" className="w-25 h-20" />
            </div>
            <div className=" border-black border-[1px] p-5 rounded-lg cursor-pointer relative">
              <input
                type="checkbox"
                name=""
                id=""
                className="absolute -top-1 p-3  left-0 rounded-[50%] bg-green-500 border-black form-checkbox text-white-500 checked:bg-green-500 border-0 checked:border-none"
              />
              <img src="/eth.png" alt="" className="w-25 h-20" />
            </div>
          </div>
          <div className="flex justify-between p-5 gap-10">
            <div className=" border-black border-[1px] p-5 rounded-lg cursor-pointer relative">
              <input
                type="checkbox"
                name=""
                id=""
                className="absolute -top-1 p-3  left-0 rounded-[50%] bg-green-500 border-black form-checkbox text-white-500 checked:bg-green-500 border-0 checked:border-none"
              />
              <img src="/ltc.png" alt="" className="w-25 h-20" />
            </div>
            <div className=" border-black border-[1px] p-5 rounded-lg cursor-pointer relative">
              <input
                type="checkbox"
                name=""
                id=""
                className="absolute -top-1 p-3  left-0 rounded-[50%] bg-green-500 border-black form-checkbox text-white-500 checked:bg-green-500 border-0 checked:border-none"
              />
              <img src="/xrp.png" alt="" className="w-25 h-20" />
            </div>
          </div>
          <div className="flex justify-between p-5 gap-10">
            <div className=" border-black border-[1px] p-5 rounded-lg cursor-pointer relative">
              <input
                type="checkbox"
                name=""
                id=""
                className="absolute -top-1 p-3  left-0 rounded-[50%] bg-green-500 border-black form-checkbox text-white-500 checked:bg-green-500 border-0 checked:border-none"
              />
              <img src="/usdt.png" alt="" className="w-25 h-20" />
            </div>
            <div className=" border-black border-[1px] p-5 rounded-lg cursor-pointer relative">
              <input
                type="checkbox"
                name=""
                id=""
                className="absolute -top-1 p-3  left-0 rounded-[50%] bg-green-500 border-black form-checkbox text-white-500 checked:bg-green-500 border-0 checked:border-none"
              />
              <img src="/bal.png" alt="" className="w-25 h-20" />
            </div>
          </div>
        </div>
        <Link to="/payment">
          <button
            className="bg-gradient-to-br text-white relative left-[50%] -translate-x-1/2 from-gray-800 to-gray-900 w-[90%] rounded-lg py-3 px-10"
            onClick={handleDepositClick}
          >
            Make Deposit
          </button>
        </Link>
      </div>
      <div className="rounded shadow-xl min-h-[100vh] bg-white w-[30%] pb-10 max-xl:w-[60%] max-lg:w-[70%] max-md:w-[80%] max-sm:w-[100%]">
        <div class=" bg-green-500 p-5 rounded-xl before:w-full min-h-[40vh] ">
          <p className="text-[1.2rem] font-semibold text-white mb-3">Legend</p>
          <button className="text-black cursor-auto rounded-xl px-2 py-1">
            Real Estate
          </button>
        </div>
        <div className="flex justify-between p-5 items-center">
          <ul className="leading-10">
            <li>Min Deposit</li>
            <li>Max Deposit</li>
            <li>Daily Profit</li>
            <li>Referral Bonus</li>
            <li>Duration</li>
          </ul>
          <ul className="leading-10">
            <li>$10,000.00</li>
            <li>$19,999.00</li>
            <li>1.5%</li>
            <li>5%</li>
            <li>6 Month(s)</li>
          </ul>
        </div>
        <form action="" className="px-5">
          <label htmlFor="" className="text-center mb-3 block font-semibold">
            Enter Amount:<span className="text-[#F25961]">*</span>
          </label>
          <input
            type="number"
            className="w-[100%] "
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
            <div className=" border-black border-[1px] p-5 rounded-lg cursor-pointer relative">
              <input
                type="checkbox"
                name=""
                id=""
                className="absolute -top-1 p-3  left-0 rounded-[50%] bg-green-500 border-black form-checkbox text-white-500 checked:bg-green-500 border-0 checked:border-none"
              />
              <img src="/btc.png" alt="" className="w-25 h-20" />
            </div>
            <div className=" border-black border-[1px] p-5 rounded-lg cursor-pointer relative">
              <input
                type="checkbox"
                name=""
                id=""
                className="absolute -top-1 p-3  left-0 rounded-[50%] bg-green-500 border-black form-checkbox text-white-500 checked:bg-green-500 border-0 checked:border-none"
              />
              <img src="/eth.png" alt="" className="w-25 h-20" />
            </div>
          </div>
          <div className="flex justify-between p-5 gap-10 ">
            <div className=" border-black border-[1px] p-5 rounded-lg cursor-pointer relative">
              <input
                type="checkbox"
                name=""
                id=""
                className="absolute -top-1 p-3  left-0 rounded-[50%] bg-green-500 border-black form-checkbox text-white-500 checked:bg-green-500 border-0 checked:border-none"
              />
              <img src="/ltc.png" alt="" className="w-25 h-20" />
            </div>
            <div className=" border-black border-[1px] p-5 rounded-lg cursor-pointer relative">
              <input
                type="checkbox"
                name=""
                id=""
                className="absolute -top-1 p-3  left-0 rounded-[50%] bg-green-500 border-black form-checkbox text-white-500 checked:bg-green-500 border-0 checked:border-none"
              />
              <img src="/xrp.png" alt="" className="w-25 h-20" />
            </div>
          </div>
          <div className="flex justify-between p-5 gap-10">
            <div className=" border-black border-[1px] p-5 rounded-lg cursor-pointer relative">
              <input
                type="checkbox"
                name=""
                id=""
                className="absolute -top-1 p-3  left-0 rounded-[50%] bg-green-500 border-black form-checkbox text-white-500 checked:bg-green-500 border-0 checked:border-none"
              />
              <img src="/usdt.png" alt="" className="w-25 h-20" />
            </div>
            <div className=" border-black border-[1px] p-5 rounded-lg cursor-pointer relative">
              <input
                type="checkbox"
                name=""
                id=""
                className="absolute -top-1 p-3  left-0 rounded-[50%] bg-green-500 border-black form-checkbox text-white-500 checked:bg-green-500 border-0 checked:border-none"
              />
              <img src="/bal.png" alt="" className="w-25 h-20" />
            </div>
          </div>
          <Link to="/payment">
            <button
              className="bg-gradient-to-br text-white relative left-[50%] -translate-x-1/2 from-gray-800 to-gray-900 w-[90%] rounded-lg py-3 px-10"
              onClick={handleDepositClick}
            >
              Make Deposit
            </button>
          </Link>
        </div>
      </div>
      <div className="rounded shadow-xl min-h-[100vh] bg-white w-[30%] pb-10 max-xl:w-[60%] max-lg:w-[70%] max-md:w-[80%] max-sm:w-[100%]">
        <div class=" bg-green-500 p-5 rounded-xl before:w-full min-h-[40vh] ">
          <p className="text-[1.2rem] font-semibold text-white mb-3">
            Standard
          </p>
          <button className="text-black cursor-auto rounded-xl px-2 py-1">
            Crypto mining
          </button>
        </div>

        <div className="flex justify-between p-5 items-center">
          <ul className="leading-10">
            <li>Min Deposit</li>
            <li>Max Deposit</li>
            <li>Daily Profit</li>
            <li>Referral Bonus</li>
            <li>Duration</li>
          </ul>
          <ul className="leading-10">
            <li>$10,000.00</li>
            <li>$19,999.00</li>
            <li>1.5%</li>
            <li>5%</li>
            <li>6 Month(s)</li>
          </ul>
        </div>
        <form action="" className="px-5">
          <label htmlFor="" className="text-center mb-3 block font-semibold">
            Enter Amount: <span className="text-[#F25961]">*</span>
          </label>
          <input
            type="number"
            className="w-[100%] "
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
            <div className=" border-black border-[1px] p-5 rounded-lg cursor-pointer relative">
              <input
                type="checkbox"
                name=""
                id=""
                className="absolute -top-1 p-3  left-0 rounded-[50%] bg-green-500 border-black form-checkbox text-white-500 checked:bg-green-500 border-0 checked:border-none"
              />
              <img src="/btc.png" alt="" className="w-25 h-20" />
            </div>
            <div className=" border-black border-[1px] p-5 rounded-lg cursor-pointer relative">
              <input
                type="checkbox"
                name=""
                id=""
                className="absolute -top-1 p-3  left-0 rounded-[50%] bg-green-500 border-black form-checkbox text-white-500 checked:bg-green-500 border-0 checked:border-none"
              />
              <img src="/eth.png" alt="" className="w-25 h-20" />
            </div>
          </div>
          <div className="flex justify-between p-5 gap-10">
            <div className=" border-black border-[1px] p-5 rounded-lg cursor-pointer relative">
              <input
                type="checkbox"
                name=""
                id=""
                className="absolute -top-1 p-3  left-0 rounded-[50%] bg-green-500 border-black form-checkbox text-white-500 checked:bg-green-500 border-0 checked:border-none"
              />
              <img src="/ltc.png" alt="" className="w-25 h-20" />
            </div>
            <div className=" border-black border-[1px] p-5 rounded-lg cursor-pointer relative">
              <input
                type="checkbox"
                name=""
                id=""
                className="absolute -top-1 p-3  left-0 rounded-[50%] bg-green-500 border-black form-checkbox text-white-500 checked:bg-green-500 border-0 checked:border-none"
              />
              <img src="/xrp.png" alt="" className="w-25 h-20" />
            </div>
          </div>
          <div className="flex justify-between p-5 gap-10">
            <div className=" border-black border-[1px] p-5 rounded-lg cursor-pointer relative">
              <input
                type="checkbox"
                name=""
                id=""
                className="absolute -top-1 p-3  left-0 rounded-[50%] bg-green-500 border-black form-checkbox text-white-500 checked:bg-green-500 border-0 checked:border-none"
              />
              <img src="/usdt.png" alt="" className="w-25 h-20" />
            </div>
            <div className=" border-black border-[1px] p-5 rounded-lg cursor-pointer relative">
              <input
                type="checkbox"
                name=""
                id=""
                className="absolute -top-1 p-3  left-0 rounded-[50%] bg-green-500 border-black form-checkbox text-white-500 checked:bg-green-500 border-0 checked:border-none"
              />
              <img src="/bal.png" alt="" className="w-25 h-20" />
            </div>
          </div>
          <Link to="/payment">
            <button
              className="bg-gradient-to-br text-white relative left-[50%] -translate-x-1/2 from-gray-800 to-gray-900 w-[90%] rounded-lg py-3 px-10"
              onClick={handleDepositClick}
            >
              Make Deposit
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PricingPlan;
