import { useState } from 'react';
import PricingPlan from '../components/PricingPlan';

const MyReferral = () => {
  const [referralLink, setReferralLink] = useState('https://your-referral-link.com');
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink)
      .then(() => {
        setCopied(true);
        console.log('Referral link copied to clipboard');
      })
      .catch((error) => {
        console.error('Error copying referral link: ', error);
      });
  };

  return (
    <div className='p-5'>
      <div className="text-white bg-gradient-to-br rounded h-[8rem] my-0 mx-auto">
        <p className="px-3 py-5 font-semibold text-[1.2rem] text-black shadow-xl text-center xl:py-10">
          Referral
        </p>
      </div>

      <div className="shadow-xl py-10 px-5">
        <div className="text-center">
          <h3>Invite Your Friends</h3>
          <p>
            Earn more when you refer your friends to invest with us. The reward
            on our referral program is dependent on the deposit plans.
          </p>
        </div>

        <div className="flex justify-around items-center gap-3 my-20 max-sm:flex-col">
          <button className='py-3 px-4 w-[25%] bg-blue-700 text-white rounded max-sm:w-[100%]'>Email</button>
          <button className='py-3 px-4 w-[25%] bg-blue-700 text-white rounded max-sm:w-[100%]'>Facebook</button>
          <button className='py-3 px-4 w-[25%] bg-blue-700 text-white rounded max-sm:w-[100%]'>Whatsapp</button>
          <button className='py-3 px-4 w-[25%] bg-blue-700 text-white rounded max-sm:w-[100%]'>Telegram</button>
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
            className={`mt-2 px-4 py-2 ${copied ? 'bg-blue-500' : 'bg-blue-700'} text-white rounded cursor-pointer w-[100%]`}
          >
            {copied ? 'Copied!' : 'Copy Referral Link'}
          </button>
        </div>
      </div>
      <PricingPlan/>
    </div>
  );
};

export default MyReferral;
