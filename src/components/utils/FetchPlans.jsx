// utils/api.js
const fetchPlans = async () => {
    try {
      const response = await fetch('https://vaultcoin-production.up.railway.app/plans/all', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'X-CSRFToken': 'Xfj3eToWqk8TYM1cxPR3acApkI15bsNKfLCLqta0rWPJWCBQdG8mpNmXyr6o9ada'
        }
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error fetching plans:', error);
      throw error; // Propagate the error to the caller
    }
  };
  
  export { fetchPlans };
  