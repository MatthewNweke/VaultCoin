import { useState } from 'react';
import PricingPlan from '../components/PricingPlan';

const Payment = () => {
  const [referralLink, setReferralLink] = useState(
    'rnFXnrgpekdBa1dxR99QcUsdX6bmVLqhq4'
  );
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(referralLink)
      .then(() => {
        setCopied(true);
        console.log('Referral link copied to clipboard');
      })
      .catch((error) => {
        console.error('Error copying referral link: ', error);
      });
  };

  // timer

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  

  return (
    <div>
      <div className="bg-white py-10 px-5 shadow-xl min-h-[40vh]">
        <div className="">
          {/* <img src="/check_img.png" alt="" className="w-[5rem] mx-auto my-0" />
          <p className="text-center">Deposit Successful</p> */}
          <div className="flex items-center leading-8 justify-between max-lg:flex-col max-lg:justify-center max-lg:mt-10">
            <div className=" max-lg:text-center max-lg:w-[100%]">
              <p>Transaction </p>
              <p>Amount</p>
              <p>Transaction</p>
              <p>Date19</p> 
              <p>Payment Method</p>
            </div>

            <div className="max-lg:w-[100%] max-lg:text-center max-lg:mt-5">
              <p>STPM2408</p>
              <p>$130.0 K</p>
              <p>$650.00</p>
              <p>19 Jan 2024 01:24:27 am</p>
              <p>Ripple</p>
            </div>
          </div>
          <div className="text-center leading-9">
            <p className="text-[#000020] text-[0.7rem]">Total Amount </p>
            <p>$ 130.7 K </p>
            <p className="text-[#000020] text-[0.7rem]">
              Pay the total amount to the Ripple wallet below.
            </p>
          </div>
        </div>
        <div className="shadow-xl py-10 px-5">
          <div className="mt-4 text-center">
            <input
              type="text"
              value={referralLink}
              onChange={(e) => setReferralLink(e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded"
            />
            <button
              onClick={handleCopyLink}
              className={`mt-2 px-4 py-2 ${
                copied ? 'bg-blue-500' : 'bg-blue-700'
              } text-white rounded cursor-pointer w-[100%]`}
            >
              {copied ? 'Copied!' : 'Copy Referral Link'}
            </button>
          </div>
          <p className='text-center text-[0.7rem] p-5'>
          Send only Ripple to this address. Sending any other coins may result
          in permanent loss. Your deposit will be cancelled if you do not pay
          within
        </p>
        </div>
       
      </div>

      <div className="p-5">
        <PricingPlan />
      </div>
    </div>
  );
};

export default Payment;
