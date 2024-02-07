import { useState, useEffect } from 'react';
import PricingPlan from '../components/PricingPlan';

const MyReferral = () => {
  const [referralLink, setReferralLink] = useState('https://your-referral-link.com');
  const [copied, setCopied] = useState(false);
  const [referralData, setReferralData] = useState(null);

  useEffect(() => {
    const fetchReferralData = async () => {
      try {
        const response = await fetch('https://vaultcoin-production.up.railway.app/referral/', {
          method: 'GET',
          headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA3MzM2NDAwLCJpYXQiOjE3MDcyMjg0MDAsImp0aSI6ImQxMzIxMjhhZjVlMzRlNWNhZGI5MTg1ZDdjMDlhNTJmIiwidXNlcl9pZCI6NzAsImZpcnN0X25hbWUiOiJOV0VLRSIsImVtYWlsIjoibndla2VtYXR0aGV3MjQzQGdtYWlsLmNvbSIsInVzZXJfbmFtZSI6IlBtYXR0IiwiaWQiOjcwfQ.OGtFRc5j9gV629sI1IeWNJSKmdk-lwe4EkCIWScPjrY',
            'X-CSRFToken': 'v0Ve5Dq9yTPj2WvenHnxrORyxnS1Py3INweWhdcdzvw90M5S3yEQGpD6L6XkNgt8'
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            // Assuming only the first referral data is used
            setReferralData(data[0]);
          }
        } else {
          console.error('Failed to fetch referral data');
        }
      } catch (error) {
        console.error('Error fetching referral data:', error);
      }
    };

    fetchReferralData();
  }, []); // Empty dependency array means this effect will run once when the component mounts

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

        {/* ... (existing code for buttons) */}

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

        {referralData && (
          <div className="mt-4">
            <p>Referral ID: {referralData.id}</p>
            <p>Referred User: {referralData.referred_user.username}</p>
            <p>Referral Profit: {referralData.referral_profit}</p>
            <p>Referral last name: {referralData.referred_user.last_name}</p>
          </div>
        )}
      </div>
      <PricingPlan />
    </div>
  );
};

export default MyReferral;
