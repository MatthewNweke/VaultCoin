import React, { useEffect, useState } from 'react';
import PricingPlan from '../components/PricingPlan';
import DepositHistory from './DepositHistory';

const Deposits = () => {
  
  return (
    <div className=" ">
     <DepositHistory/>
      {/* Hot pricing plans */}
      <PricingPlan />
    </div>
  );
};

export default Deposits;
