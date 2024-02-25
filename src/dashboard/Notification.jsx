import { useState, useEffect } from 'react';
import axios from 'axios';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'https://vaultcoin-production.up.railway.app/notification/',
          {
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer ' + token
            },
          }
        );

        if (response.status === 200) {
          setNotifications(response.data.notifications);
        } else {
          console.error('Failed to fetch notifications');
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    
    fetchNotifications();
  }, []); // removed authToken and csrfToken from the dependency array

  return (
    <div>
      <div className=" shadow-xl rounded px-5 py-10">
        <p className="py-10 px-5 font-semibold text-2xl">All Notifications</p>
            
        {notifications.map((notification, index) => (
          <div
            key={index}
            className="border border-[#00000020] hover:text-green-500 border-x-0 p-5 cursor-pointer"
          >
            <p className="">{notification.description}</p>
            <p className="text-[0.7rem]">{notification.created}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
