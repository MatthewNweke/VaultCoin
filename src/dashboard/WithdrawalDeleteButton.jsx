import React, { useState, useEffect } from 'react';

const WithdrawalDeleteButton = () => {
  const [withdrawalIds, setWithdrawalIds] = useState([]);

  useEffect(() => {
    // Fetch withdrawal IDs from an API endpoint
    fetchWithdrawalIds()
      .then(ids => setWithdrawalIds(ids))
      .catch(error => console.error('Error fetching withdrawal IDs:', error));
  }, []);

  const fetchWithdrawalIds = async () => {
    try {
      const response = await fetch('your-api-endpoint');
      if (!response.ok) {
        throw new Error('Failed to fetch withdrawal IDs');
      }
      const data = await response.json();
      return data.withdrawalIds; // Assuming the API response contains an array of withdrawal IDs
    } catch (error) {
      throw error;
    }
  };

  return (
    <div>
      {/* Map through withdrawalIds to render WithdrawalDeleteButton for each ID */}
      {withdrawalIds.map(withdrawalId => (
        <WithdrawalDeleteButton key={withdrawalId} withdrawalId={withdrawalId} />
      ))}
    </div>
  );
};

export default WithdrawalDeleteButton;
