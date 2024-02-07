import { useState, useEffect } from 'react';
import PricingPlan from '../components/PricingPlan';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          'https://vaultcoin-production.up.railway.app/notification/',
          {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA3MzYyNTE0LCJpYXQiOjE3MDcyNTQ1MTQsImp0aSI6ImJmMTg2ZTViZTljMjRkNTI4MjZmZjkzNzBmMDY4NjA0IiwidXNlcl9pZCI6NzAsImZpcnN0X25hbWUiOiJOV0VLRSIsImVtYWlsIjoibndla2VtYXR0aGV3MjQzQGdtYWlsLmNvbSIsInVzZXJfbmFtZSI6IlBtYXR0IiwiaWQiOjcwfQ.CO66prJSZkbdSdEAVQkSwAtGODAj_GDj1XzZa0wTZzk', // Replace with your actual access token
              'X-CSRFToken':
                'SRG8HzbflT8HUpSvUtCVwAskcDohXxssanZQT9XjmvPxSfs9AkTeLbeSqmtAVfSS', // Replace with your actual CSRF token
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setNotifications(data.notifications);
        } else {
          console.error('Failed to fetch notifications');
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    // Call the fetchNotifications function
    fetchNotifications();
  }, []); // Empty dependency array means this effect will run once when the component mounts

  return (
    <div>
      <div className=" shadow-xl rounded px-5 py-10">
        <p className="py-10 px-5 font-semibold text-2xl">All Notifications</p>

        {notifications.map((notification, index) => (
          <div
            key={index}
            className="border border-[#00000020] hover:text-green-500 border-x-0 p-5 cursor-pointer"
          >
            <p className=''>{notification.description}</p>
            <p className="text-[0.7rem]">{notification.created}</p>
          </div>
        ))}
      </div>

      <PricingPlan />
    </div>
  );
};

export default Notification;
