import { useState } from 'react';
import { Link } from 'react-router-dom';

const NotificationDropdown = () => {
  // Replace this with your actual notification data
  const notifications = [
    { id: 1, text: 'Notification 1' },
    { id: 2, text: 'Notification 2' },
    { id: 2, text: 'Notification 3' },
    { id: 2, text: 'Notification 4' },
    // Add more notifications as needed
  ];

  return (
    <div className="absolute top-14 right-0 w-64 p-4 bg-blue-700 border rounded shadow">
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>{notification.text}</li>
        ))}
      </ul>
    </div>
  );
};

const Header = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const closeDropdown = () => {
    setDropdownVisible(false);
  };

  return (
    <div className="h-[5rem] my-5 px-3 w-[100%] rounded bg-blue-700 text-white hidden lg:block relative">
      <ul className="flex h-[100%] gap-10 items-center justify-around max-2xl:justify-center font-semibold">
        <li className="cursor-pointer">Deposit</li>
        <li className="cursor-pointer">Withdraw</li>
        <li className="cursor-pointer">Wallet</li>
        <li className="cursor-pointer">History</li>
        <li className="cursor-pointer">Plans</li>
        <li className="cursor-pointer">Support</li>
        <li className="cursor-pointer relative" onClick={toggleDropdown}>
          <img src="/notification_bell.svg" alt="" />
          {isDropdownVisible && <NotificationDropdown />}
        </li>
      </ul>
      {isDropdownVisible && (
        // Add an invisible layer to close the dropdown when clicking outside of it
        <div
          className="fixed top-0 left-0 w-full h-full bg-transparent"
          onClick={closeDropdown}
        />
      )}
    </div>
  );
};

export default Header;
