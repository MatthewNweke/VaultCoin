import { useState, useEffect } from 'react';

const Notification = ({ authToken, csrfToken }) => {
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
              Authorization: authToken,
              'X-CSRFToken': csrfToken,
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
  }, [authToken, csrfToken]); // Now this effect will re-run whenever authToken or csrfToken changes

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
