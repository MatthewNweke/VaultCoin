import React, { useState, useEffect } from 'react';
import PricingPlan from '../components/PricingPlan';

const Bonus = () => {
  // State to store bonus data
  const [bonusData, setBonusData] = useState([]);
  // State to handle loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch bonus data
    const fetchBonusData = async () => {
      try {
        // Make the API request
        const response = await fetch('https://vaultcoin-production.up.railway.app/bonus/', {
          method: 'GET',
          headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA2NzEzODQyLCJpYXQiOjE3MDY2MDU4NDIsImp0aSI6IjhjN2QyNTU5ODZiNDQwNGU4NTQxYTYwYjk1ODIwNWQ4IiwidXNlcl9pZCI6ODksImZpcnN0X25hbWUiOiJNYXR0aGV3IiwiZW1haWwiOiJud2VrZW1hdHRoZXcyNDc4M0BnbWFpbC5jb20iLCJ1c2VyX25hbWUiOiJqb2huX2RvZSIsImlkIjo4OX0.B2nQnPPd4J2lNjE5m9qbanuSKWtKtd1vWQqfJrkT6v4', // Replace with your actual access token
            'X-CSRFToken': 'tCUFhUh0aiPJhnOl7pWaOrNGNmEkxrCZL8dntu34bUwzfdoZNgdt32ze15JDv92p', // Replace with your actual CSRF token
          },
        });

        // Check if the request was successful (status code 200)
        if (response.ok) {
          const data = await response.json();
          // Set the bonus data in the state
          setBonusData(data);
        } else {
          console.error(`Failed to fetch bonus data. Status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error fetching bonus data:', error);
      } finally {
        // Set loading to false once the request is completed
        setLoading(false);
      }
    };

    // Call the function to fetch bonus data
    fetchBonusData();
  }, []); // Empty dependency array to run the effect only once when the component mounts

  return (
    <div>
      <div className="px-3 bg-white relative bottom-6 max-sm:bottom-0 text-center max-sm:py-5 shadow-xl mb-20 h-[5rem] w-[90%] translate-x-[-50%] left-1/2 m-0 rounded">
        <p className="px-3 py-5 mb-2 font-semibold text-[1.2rem] ">History</p>
        <p className="px-3 py-5 border-b-[1px] border-[#00000010] mb-2 font-semibold text-[1.2rem] ">
          All Bonus
        </p>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        // Render the PricingPlan component with the fetched bonus data
        <PricingPlan bonusData={bonusData} />
      )}
    </div>
  );
};

export default Bonus;
