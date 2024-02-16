import React, { useState, useEffect } from 'react';
import PricingPlan from '../components/PricingPlan';
import { AUTH_TOKEN, CSRF_TOKEN } from './config';

const AllTransfers = () => {
 
  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    // Function to fetch transfer data
    const fetchTransfers = async () => {
      try {
        // Make GET request to API endpoint
        const response = await fetch('https://vaultcoin-production.up.railway.app/transfer/', {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: AUTH_TOKEN,
            'X-CSRFToken': CSRF_TOKEN
          }
        });

        // Check if request was successful
        if (response.ok) {
          // Parse response JSON
          const data = await response.json();
          // Set transfer data to state
          setTransfers(data);
        } else {
          // Handle error response
          console.error('Failed to fetch transfers:', response.statusText);
        }
      } catch (error) {
        // Handle fetch error
        console.error('Error fetching transfers:', error);
      }
    };

    // Call fetchTransfers function
    fetchTransfers();
  }, []); // Run effect only once on component mount

  return (
    <div className=''>
      <div className="rounded h-[8rem] pt-10 w-[100%] m-0 text-center">
        <p className="px-3 py-5 font-semibold text-[1.2rem]">
          History
        </p>
      </div>
      <div className="px-3 bg-white relative bottom-6 h-[8rem] w-[90%] translate-x-[-50%] left-1/2 m-0 rounded shadow-lg">
        <p className="px-3 py-5 border-b-[1px] border-[#00000010] mb-2 font-semibold text-[1.2rem]">
          All Transfers
        </p>
      </div>
      <PricingPlan transfers={transfers} />
    </div>
  );
};

export default AllTransfers;
