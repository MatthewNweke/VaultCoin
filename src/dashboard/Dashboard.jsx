// src/components/Dashboard.js

import { useState, useEffect } from 'react';
import Sides from '../dashboard/Sides';
import { useLocation } from 'react-router-dom';
import MainContent from '../dashboard/MainContent';

const Dashboard = () => {
  const location = useLocation();
  const user = location.state?.user;

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
  }, [location.pathname]);

  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemSelected = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="flex  overflow-hidden">
      {/* Pass the user prop to the Sides component */}
      <Sides username={user?.username} onItemSelected={handleItemSelected} />
      <MainContent selectedItem={selectedItem} />
    </div>
  );
};

export default Dashboard;
