import MyReferral from './MyReferral';
import { useState, useEffect } from 'react';
import PricingPlan from '../components/PricingPlan';
import { AUTH_TOKEN, CSRF_TOKEN } from './config';

const FirstPage = () => {
  const [referralLink, setReferralLink] = useState(
    'https://your-referral-link.com'
  );
  const [copied, setCopied] = useState(false);
  const [deposits, setDeposits] = useState([]);
  const [referralCount, setReferralCount] = useState(0);
  

  useEffect(() => {
    const getUsernameFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      return params.get('username');
    };

    // Construct the referral link using the extracted username
    const username = getUsernameFromUrl();
    if (username) {
      setReferralLink(`https://your-referral-link.com/${username}`); // Replace with your actual referral link format
    }
  }, []);



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

  useEffect(() => {
    const fetchDeposits = async () => {
      try {
        const response = await fetch(
          'https://vaultcoin-production.up.railway.app/deposit/',
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              Authorization: AUTH_TOKEN,
              'X-CSRFToken': CSRF_TOKEN,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch deposits');
        }

        const data = await response.json();
        setDeposits(data);
      } catch (error) {
        console.error('Error fetching deposits:', error.message);
      }
    };

    fetchDeposits();
  }, []);

  // Dummy function to simulate referral count increment
  const handleReferral = () => {
    setReferralCount(referralCount + 1);
  };

  useEffect(() => {
    const fetchDeposits = async () => {
      try {
        const response = await fetch(
          'https://vaultcoin-production.up.railway.app/deposit/',
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              Authorization: AUTH_TOKEN,
              'X-CSRFToken': CSRF_TOKEN,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch deposits');
        }

        const data = await response.json();
        setDeposits(data);
      } catch (error) {
        console.error('Error fetching deposits:', error.message);
      }
    };

    fetchDeposits();
  }, []);

  const shareViaEmail = () => {
    window.location.href = `mailto:?subject=Check%20out%20this%20referral%20program&body=Hey!%20I%20thought%20you%20might%20be%20interested%20in%20this%20referral%20program:%20${referralLink}`;
  };

  const shareViaFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        referralLink
      )}`,
      '_blank'
    );
  };

  const shareViaWhatsApp = () => {
    window.open(
      `whatsapp://send?text=${encodeURIComponent(referralLink)}`,
      '_blank'
    );
  };

  const shareViaTelegram = () => {
    window.open(
      `https://telegram.me/share/url?url=${encodeURIComponent(referralLink)}`,
      '_blank'
    );
  };

  return (
    <div className=" py-10 px-5">
      {/* <select name="deposit" id="" className="w-[100%] my-5 cursor-pointer">
        <option value="deposit" className="py-5">
          Choose type of deposit
        </option>
        <option value="deposit">Real estate</option>
        <option value="deposit">Crypto Minning</option>
      </select> */}
      <div className="flex justify-between  items-center  max-xl:flex-col">
        <div className="w-[45%] my-2 max-xl:w-[90%] max-sm:w-[100%]">
          {deposits.map((deposit) => (
            <div
              key={deposit.id}
              className={`bg-${
                deposit.verified ? 'blue' : '[#00000020]'
              } rounded h-[5rem] py-8 flex justify-around items-center cursor-pointer hover:bg-[#00000010]`}
            >
              <div>
                <p>Deposit#{deposit.id}</p>{' '}
                <p className="text-[0.5rem]">{deposit.created}</p>
              </div>
              <p>{`$${deposit.amount}`}</p>
              <p
                className={`font-bold ${deposit.verified ? 'text-white' : ''}`}
              >
                {deposit.verified ? 'Success' : 'Pending'}
              </p>
            </div>
          ))}
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
              <button
                className="py-3 px-4 w-[25%] bg-blue-700 text-white rounded max-xl:w-[100%]"
                onClick={shareViaEmail}
              >
                Email
              </button>
              <button
                className="py-3 px-4 w-[25%] bg-blue-700 text-white rounded max-xl:w-[100%]"
                onClick={shareViaFacebook}
              >
                Facebook
              </button>
              <button
                className="py-3 px-4 w-[25%] bg-blue-700 text-white rounded max-xl:w-[100%]"
                onClick={shareViaWhatsApp}
              >
                Whatsapp
              </button>
              <button
                className="py-3 px-4 w-[25%] bg-blue-700 text-white rounded max-xl:w-[100%]"
                onClick={shareViaTelegram}
              >
                Telegram
              </button>
            </div>
            <div className="mt-4 text-center">
              <p>Your Referral Link:</p>
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
            {/* Display referral count */}
            <p>Total Referrals: {referralCount}</p>
            {/* Button to simulate referral */}
            <button onClick={handleReferral}>Simulate Referral</button>
          </div>
        </div>
      </div>
      <PricingPlan />
      <PricingPlan />
    </div>
  );
};

export default FirstPage;
