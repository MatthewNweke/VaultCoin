import MyReferral from './MyReferral';
import { useState } from 'react';
import PricingPlan from '../components/PricingPlan';
const FirstPage = () => {
  const [referralLink, setReferralLink] = useState(
    'https://your-referral-link.com'
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

  

  return (
    <div className=' py-10 px-5'>
      <select name="deposit" id="" className="w-[100%] my-5 cursor-pointer">
        <option value="deposit" className="py-5">
          Choose type of deposit
        </option>
        <option value="deposit">Real estate</option>
        <option value="deposit">Crypto Minning</option>
      </select>
      <div className="flex justify-between items-center  max-xl:flex-col">
        <div className="w-[45%] max-xl:w-[100%]">
          <div className="bg-[#00000020] my-3 rounded h-[5rem] py-8 flex justify-around items-center cursor-pointer hover:bg-[#00000010]  ">
            <div>
              <p>Deposit#STPM2398</p>{' '}
              <p className="text-[0.5rem]">05 Jan 2024 04:27:47 pm</p>
            </div>
            <p>$20,000.00</p>
            <p className=" font-bold">Success</p>
          </div>
          <div className="rounded h-[5rem] py-8 flex justify-around items-center cursor-pointer hover:bg-[#00000020]  ">
            <div>
              <p>Deposit#STPM2398</p>{' '}
              <p className="text-[0.5rem]">05 Jan 2024 04:27:47 pm</p>
            </div>
            <p>$20,000.00</p>
            <p className=" font-bold">Success</p>
          </div>
          <div className="bg-[#00000020] my-3 rounded h-[5rem] py-8 flex justify-around items-center cursor-pointer hover:bg-[#00000010]  ">
            <div>
              <p>Deposit#STPM2398</p>{' '}
              <p className="text-[0.5rem]">05 Jan 2024 04:27:47 pm</p>
            </div>
            <p>$20,000.00</p>
            <p className=" font-bold">Pending</p>
          </div>
        </div>
        <div className="w-[45%] max-xl:w-[100%]">
          <div className="shadow-xl py-10 px-5">
            <div className="text-center">
              <h3>Invite Your Friends</h3>
              <p>
                Earn more when you refer your friends to invest with us. The
                reward on our referral program is dependent on the deposit
                plans.
              </p>
            </div>

            <div className="flex justify-around items-center gap-3 my-20 max-xl:flex-col ">
              <button className="py-3 px-4 w-[25%] bg-blue-700 text-white rounded max-xl:w-[100%]">
                Email
              </button>
              <button className="py-3 px-4 w-[25%] bg-blue-700 text-white rounded max-xl:w-[100%]">
                Facebook
              </button>
              <button className="py-3 px-4 w-[25%] bg-blue-700 text-white rounded max-xl:w-[100%]">
                Whatsapp
              </button>
              <button className="py-3 px-4 w-[25%] bg-blue-700 text-white rounded max-xl:w-[100%]">
                Telegram
              </button>
            </div>

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
          </div>
        </div>
      </div>
      <PricingPlan />
    </div>
  );
};

export default FirstPage;
