import React, { useState, useEffect } from 'react';


const NotificationDropdown = ({ notifications }) => {
  return (
    <div className="absolute max-h-[100vh] overflow-x-hidden overflow-auto right-0 mt-2 w-[50vw] bg-blue-700 py-5 px-3 text-white border rounded-md shadow-lg z-10 max-sm:w-[70vw]">
      <div className="shadow-xl rounded px-5 py-10">
        <p className="py-10 text-center font-semibold text-2xl">
          All Notifications
        </p>

        {notifications.map((notification, index) => (
          <div
            key={index}
            className="border border-[#00000020] hover:text-green-500 border-x-0 p-5 cursor-pointer"
          >
            <p>{notification.description}</p>
            <p className="text-[0.7rem]">{notification.created}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Sides = ({ username, onItemSelected }) => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationsCount, setNotificationsCount] = useState(0);

  const sidebarItems = [
    'Dashboard',
    'Deposit',
    'Withdraw',
    'Transfer',
    'Mywallet',
    'Pricing plans',
    'Bonus',
    'All Transactions',
    'Deposit History',
    'Withdrawal History',
    'Transfer History',
    'My Profile',
    'My Referral',
    'Notifications',
    'Contact Support',
    <li className="text-white border-none mb-5">
      Logout
    </li>,
  ];

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          'https://vaultcoin-production.up.railway.app/notification/',
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('token')
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setNotifications(data.notifications);
          setNotificationsCount(data.notifications.length);
        } else {
          console.error('Failed to fetch notifications');
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleLogout = () => {
    document.cookie =
      'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie =
      'csrftoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    console.log('Logged out successfully');
    window.location.href = '/signin';
  };

  return (
    <div className={`fixed top-0 w-72 max-lg:w-56  ${mobileMenu ? 'z-50 w-0' : 'z-50'}`}>
      <div className={`bg-blue-700 items-center z-50 flex justify-between pr-10  max-lg:w-[100vw] inset-0 py-2 lg:hidden ${mobileMenu ? 'z-50' : ''}`}>
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="lg:hidden text-2xl block border rounded border-black p-3 relative left-3"
        >
          <span role="img" aria-label="menu">&#9776;</span>
        </button>
        <li
          className="cursor-pointer relative bottom-2"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <img src="/notification_bell.svg" alt="" />
          {notificationsCount > 0 && (
            <span className="bg-red-500 absolute bottom-[1rem] rounded-full text-[0.8rem] py-1/2 px-1 left-0 text-center text-white">{notificationsCount}</span>
          )}
          {showNotifications && (
            <NotificationDropdown
              notifications={notifications}
            />
          )}
        </li>
      </div>
      <aside
        className={`${
          mobileMenu
            ? 'translate-x-0 shadow-xl'
            : '-translate-x-full max-lg:overflow-y-hidden shadow-none'
        } font-semibold overflow-hidden  text-black overflow-y-auto pb-20 h-screen fixed w-full my-4 ml-4 rounded-tr-none rounded-br-none rounded-xl duration-300 transition-transform bg-white lg:translate-x-0 lg:static max-xl:w-[15rem] `}
      >
        <p className="p-10 font-semibold text-xl text-center">
          Welcome back <br /> <span className="text-blue-500 text-2xl font-bold">{username}</span>
        </p>
        <nav>
          <ul className=" flex  w-full  items-center flex-col justify-center gap-8">
            {sidebarItems.map((item, index) => (
              <li
                className="font-normal w-[80%] text-center transition-colors hover:bg-blue-700 cursor-pointer  py-2 hover:text-white"
                key={index}
                onClick={() => {
                  if (typeof item === 'string') {
                    onItemSelected(item);
                  } else {
                    handleLogout();
                  }
                  setMobileMenu(false);
                }}
              >
                {typeof item === 'string' ? (
                  item
                ) : (
                  <button
                    className="bg-transparent text-black h-[100%]  block w-[100%] hover:text-white border-none mb-5"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default Sides;
