import { useState, useEffect } from 'react';
import { AUTH_TOKEN, CSRF_TOKEN } from './config';

const NotificationDropdown = ({ notifications }) => {
  return (
    <div className="absolute max-h-[100vh] overflow-x-hidden overflow-y-auto  w-[20vw] leading-10 top-14 right-0 w-64 p-4 bg-blue-700 border rounded shadow">
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>{notification.description}</li>
        ))}
      </ul>
    </div>
  );
};

const Header = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications from the provided API
    fetch('https://vaultcoin-production.up.railway.app/notification/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: AUTH_TOKEN,
        'X-CSRFToken': CSRF_TOKEN
      },
    })
      .then((response) => response.json())
      .then((data) => setNotifications(data.notifications))
      .catch((error) => console.error('Error fetching notifications:', error));
  }, []); // Empty dependency array ensures this effect runs once on component mount

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const closeDropdown = () => {
    setDropdownVisible(false);
  };

  return (
    <div className="h-[5rem] my-5 px-3 w-[100%] rounded bg-blue-700 text-white hidden lg:block relative">
      <ul className="flex h-[100%] gap-10  items-center  justify-around max-2xl:justify-center font-semibold">
        <li className="cursor-pointer">Deposit</li>
        <li className="cursor-pointer">Withdraw</li>
        <li className="cursor-pointer">Wallet</li>
        <li className="cursor-pointer">History</li>
        <li className="cursor-pointer">Plans</li>
        <li className="cursor-pointer">Support</li>
        <li className="cursor-pointer relative" onClick={toggleDropdown}>
          <img src="/notification_bell.svg" alt="" />
          {notifications.length > 0 && <span className="bg-red-500 absolute bottom-[1rem] rounded-full text-[0.8rem] py-1/2 px-1 left-0 text-center text-white">{notifications.length}</span>}
          {isDropdownVisible && (
            <NotificationDropdown notifications={notifications} />
          )}
        </li>
      </ul>
      {isDropdownVisible && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-transparent"
          onClick={closeDropdown}
        />
      )}
    </div>
  );
};

export default Header;
