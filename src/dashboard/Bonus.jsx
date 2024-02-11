import React, { useState, useEffect } from 'react';
import PricingPlan from '../components/PricingPlan';

const Bonus = () => {
  // State to store bonus data
  const [bonusData, setBonusData] = useState([]);

  useEffect(() => {
    // Function to fetch bonus data
    const fetchBonusData = async () => {
      try {
        // Make GET request to API endpoint
        const response = await fetch('https://vaultcoin-production.up.railway.app/bonus/', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA3MzM2NDAwLCJpYXQiOjE3MDcyMjg0MDAsImp0aSI6ImQxMzIxMjhhZjVlMzRlNWNhZGI5MTg1ZDdjMDlhNTJmIiwidXNlcl9pZCI6NzAsImZpcnN0X25hbWUiOiJOV0VLRSIsImVtYWlsIjoibndla2VtYXR0aGV3MjQzQGdtYWlsLmNvbSIsInVzZXJfbmFtZSI6IlBtYXR0IiwiaWQiOjcwfQ.OGtFRc5j9gV629sI1IeWNJSKmdk-lwe4EkCIWScPjrY',
            'X-CSRFToken': '65XKnQB4K8OJoyQUDGiT3e2f8M2kRK7PoBgszqn8LKvzmoqyjxzciPONmv7DPsxf'
          }
        });

        // Check if request was successful
        if (response.ok) {
          // Parse response JSON
          const data = await response.json();
          // Set bonus data to state
          setBonusData(data);
        } else {
          // Handle error response
          console.error('Failed to fetch bonus data:', response.statusText);
        }
      } catch (error) {
        // Handle fetch error
        console.error('Error fetching bonus data:', error);
      }
    };

    // Call fetchBonusData function
    fetchBonusData();
  }, []); // Run effect only once on component mount

  return (
    <div>
      <div className="px-3 bg-white relative bottom-6 max-sm:bottom-0 text-center max-sm:py-5 shadow-xl mb-20 h-[5rem] w-[90%] translate-x-[-50%] left-1/2 m-0 rounded">
        <p className="px-3 py-5 mb-2 font-semibold text-[1.2rem]">History</p>
        <p className="px-3 py-5 border-b-[1px] border-[#f9dbdb10] mb-2 font-semibold text-[1.2rem]">All Bonus</p>
      </div>
      <PricingPlan bonusData={bonusData} />
    </div>
  );
};

export default Bonus;
