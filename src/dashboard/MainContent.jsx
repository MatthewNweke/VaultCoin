// src/components/MainContent.js

import React from 'react';
import Deposits from './Deposits';
import Withdrawal from './Withdrawal';
import Transfer from './Transfer';
import MyWallet from './MyWallet';
import Pricing from './Pricing';
import Bonus from './Bonus';
import Transaction from './Transaction';
import DepositHistory from './Transaction';
import WithdrawalHistory from './WithdrawalHistory';
import AllTransfers from './AllTransfers';
import Profile from './Profile';
import Header from '../dashboard/Header';
import MyReferral from './MyReferral';

const MainContent = ({ selectedItem }) => {
  const contentMap = {
    Dashboard: <p>Welcome to the Dashboard!</p>,
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
    'My Referral': <MyReferral/>,
    Notifications: <p>Adjust your settings here.</p>,
    'Contact Support': <p>Adjust your settings here.</p>,
    Logout: <p>Adjust your settings here.</p>,
  };

  return (
    
      
      <main className=" px-3 overflow-hidden w-[75%] translate-x-[-50%] relative left-[50%] my-0 mx-auto max-lg:w-[100%] max-md:px-1 max-lg:mt-10">
      <Header/>
       
      {contentMap[selectedItem] || <p>Select an item from the sidebar.</p>}
      
    </main>
   
  );
};

export default MainContent;
