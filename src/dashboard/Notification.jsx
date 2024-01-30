import { useState, useEffect } from 'react';
import PricingPlan from '../components/PricingPlan';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Function to fetch notifications
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          'https://vaultcoin-production.up.railway.app/notification/',
          {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA2NzEyMDM1LCJpYXQiOjE3MDY2MDQwMzUsImp0aSI6IjIzMTYxMDhkMjg1OTQ2MjlhYmRiNTllZWE5NGNiNTljIiwidXNlcl9pZCI6ODksImZpcnN0X25hbWUiOiJNYXR0aGV3IiwiZW1haWwiOiJud2VrZW1hdHRoZXcyNDc4M0BnbWFpbC5jb20iLCJ1c2VyX25hbWUiOiJqb2huX2RvZSIsImlkIjo4OX0.C2-KTUBO6_DrB74Wj3V7x7E0KGXmZ7gGseaT9JPrEfg', // Replace with your actual access token
              'X-CSRFToken':
                'tCUFhUh0aiPJhnOl7pWaOrNGNmEkxrCZL8dntu34bUwzfdoZNgdt32ze15JDv92p', // Replace with your actual CSRF token
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
      <div className="min-h-[500px] shadow-xl rounded px-5 py-10">
        <p className="py-10">All Notifications</p>

        {notifications.map((notification, index) => (
          <div
            key={index}
            className="border border-[#00000020] hover:text-green-500 border-x-0 p-5 cursor-pointer"
          >
            <p>{notification.title}</p>
            <p>{notification.message}</p>
            <p className="text-[0.7rem]">{notification.timestamp}</p>
          </div>
        ))}
      </div>

      <PricingPlan />
    </div>
  );
};

export default Notification;
