// src/components/MainContent.js

import React from 'react';
import Deposits from './Deposits';
import Withdrawal from './Withdrawal';
import Transfer from './Transfer';
import MyWallet from './MyWallet';
import Pricing from './Pricing';
import Bonus from './Bonus';
import Transaction from './Transaction';
import DepositHistory from './DepositHistory';
import WithdrawalHistory from './WithdrawalHistory';
import AllTransfers from './AllTransfers';
import Profile from './Profile';
import Header from '../dashboard/Header';
import MyReferral from './MyReferral';
import Notification from './Notification';
import Contact from './Contact';
import FirstPage from './FirstPage';


const MainContent = ({ selectedItem }) => {
 
  const contentMap = {
    Dashboard: <FirstPage/>,
    Deposit: <Deposits />,
    Withdraw: <Withdrawal />,
    Transfer: <Transfer />,
    Mywallet: <MyWallet />,
    'Pricing plans': <Pricing />,
    Bonus: <Bonus />,
    'All Transactions': <Transaction />,
    'Deposit History': <DepositHistory />,
    'Withdrawal History': <WithdrawalHistory />,
    'Transfer History': <AllTransfers />,
    'My Profile': <Profile />,
    'My Referral': <MyReferral />,
    Notifications: <Notification />,
    'Contact Support': <Contact/>,
    "Logout": "",
    
  };

  return (
    <main className=" px-3 overflow-hidden w-[80%] translate-x-[-50%]  relative left-[50%] my-0 mx-auto max-lg:w-[100%] max-md:px-1 max-lg:mt-10 max-2xl:w-[75%]">
      <Header />

      {contentMap[selectedItem] || <FirstPage/>}
    </main>
  );
};

export default MainContent;
