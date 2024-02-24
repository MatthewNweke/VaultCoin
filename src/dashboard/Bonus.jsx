import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PricingPlan from '../components/PricingPlan';

const Bonus = () => {
  const [bonuses, setBonuses] = useState([]);

  useEffect(() => {
    const fetchBonuses = async () => {
      try {
        const response = await axios.get('https://vaultcoin-production.up.railway.app/bonus/', {
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        });
        setBonuses(response.data);
      } catch (error) {
        console.error('Error fetching bonuses:', error);
      }
    };

    fetchBonuses();
  }, []); 

  return (
    <div>
      <div className="px-3 bg-white relative bottom-6 max-sm:bottom-0 text-center max-sm:py-5 shadow-xl mb-20 h-[5rem] w-[90%] translate-x-[-50%] left-1/2 m-0 rounded">
        <p className="px-3 py-5 mb-2 font-semibold text-[1.2rem]">History</p>
        <p className="px-3 py-5 border-b-[1px] border-[#f9dbdb10] mb-2 font-semibold text-[1.2rem]">All Bonus</p>
        {bonuses.map((bonus) => (
          <div key={bonus.id}>
            <p>ID: {bonus.id}</p>
            <p>USDT Amount: {bonus.usdt_amount}</p>
            <p>Action: {bonus.action}</p>
            <p>Seen: {bonus.seen ? 'Yes' : 'No'}</p>
            <p>User See: {bonus.user_see ? 'Yes' : 'No'}</p>
            <p>Created: {bonus.created}</p>
            <p>Profile: {bonus.profile}</p>
          </div>
        ))}
      </div>
      <PricingPlan/>
    </div>
  );
};

export default Bonus;
