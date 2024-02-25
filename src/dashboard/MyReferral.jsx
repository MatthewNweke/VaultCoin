import { useState, useEffect } from 'react';
import axios from 'axios';

const MyReferral = () => {
  const [referralLink, setReferralLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [referralData, setReferralData] = useState(null);

  useEffect(() => {
    const fetchReferralData = async () => {
      try {
        const response = await axios.get(
          'https://vaultcoin-production.up.railway.app/referral/',
          {
            headers: {
              Accept: 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          }
        );

        if (response.status === 200) {
          const data = response.data;
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
  }, []);

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      setReferralLink(username);
    } else {
      setReferralLink('');
    }
  }, []);

  const handleCopyLink = () => {
    if (referralLink) {
      navigator.clipboard
        .writeText(referralLink)
        .then(() => {
          setCopied(true);
          console.log('Referral link copied to clipboard');
        })
        .catch((error) => {
          console.error('Error copying referral link: ', error);
        });
    }
  };

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
    <div className="p-5">
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

        {referralData && (
          <div className="mt-4">
            <p>Referral ID: {referralData.id}</p>
            <p>Referred User: {referralData.referred_user.username}</p>
            <p>Referral Profit: {referralData.referral_profit}</p>
            <p>Referral last name: {referralData.referred_user.last_name}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReferral;
