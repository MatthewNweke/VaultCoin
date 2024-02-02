import React, { useState, useEffect } from 'react';

const WalletInfo = () => {
  const [walletData, setWalletData] = useState({
    id: null,
    bitcoin_address: null,
    litecoin_address: null,
    xrp_address: null,
    etherum_address: null,
    usdt_address: null,
  });

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const response = await fetch('https://vaultcoin-production.up.railway.app/walletaddress/', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA2NzEzODQyLCJpYXQiOjE3MDY2MDU4NDIsImp0aSI6IjhjN2QyNTU5ODZiNDQwNGU4NTQxYTYwYjk1ODIwNWQ4IiwidXNlcl9pZCI6ODksImZpcnN0X25hbWUiOiJNYXR0aGV3IiwiZW1haWwiOiJud2VrZW1hdHRoZXcyNDc4M0BnbWFpbC5jb20iLCJ1c2VyX25hbWUiOiJqb2huX2RvZSIsImlkIjo4OX0.B2nQnPPd4J2lNjE5m9qbanuSKWtKtd1vWQqfJrkT6v4', 
            'X-CSRFToken': 'Xm0x2KhGKQLOImlOe5x5SQUPxN96YskEfSjfek3KLssEGcVsUWOo7rGnLwepWaK4',
          }
        });

        if (response.ok) {
          const data = await response.json();
          setWalletData(data);
        } else {
          console.error('Error fetching wallet data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchWalletData();
  }, []); // Empty dependency array ensures the effect runs once on component mount

  return (
    <div>
      <h2>Wallet Information</h2>
      <p>ID: {walletData.id}</p>
      <p>Bitcoin Address: {walletData.bitcoin_address || 'Not available'}</p>
      <p>Litecoin Address: {walletData.litecoin_address || 'Not available'}</p>
      <p>XRP Address: {walletData.xrp_address || 'Not available'}</p>
      <p>Ethereum Address: {walletData.etherum_address || 'Not available'}</p>
      <p>USDT Address: {walletData.usdt_address || 'Not available'}</p>
    </div>
  );
};

export default WalletInfo;
