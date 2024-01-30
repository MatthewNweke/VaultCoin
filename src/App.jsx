import './App.css';
import About from './pages/About';
import Contact from './pages/Contact';
import Register from './pages/Register';
import Plan from './pages/Plan';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Home from './pages/Home';
import Terms from './pages/Terms';
import Dashboard from './dashboard/Dashboard';
import SignIn from './pages/SignIn';
import MyReferral from './dashboard/MyReferral';
import Payment from './dashboard/Payment';
import ForgotPassword from './pages/ForgotPassword';


import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
// import { Dashboard, Auth } from './components/dashboard/layouts';

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
  }, [location.pathname]); // triggered on route change

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms&condition" element={<Terms />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/signin" element={<SignIn />} /> 
        <Route path="/referral" element={<MyReferral />} />  
        <Route path="/payment" element={<Payment />} />  
        <Route path="/forgot-password" element={<ForgotPassword />} />  
      </Routes>
    </div>
  );
}

export default App;
