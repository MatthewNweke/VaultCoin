import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import MakeDeposit from './MakeDeposit';

const PricingPlan = () => {
  const [enteredAmount1, setEnteredAmount1] = useState('');
  const [enteredAmount2, setEnteredAmount2] = useState('');
  const [enteredAmount3, setEnteredAmount3] = useState('');
  const [amountError1, setAmountError1] = useState('');
  const [amountError2, setAmountError2] = useState('');
  const [amountError3, setAmountError3] = useState('');
  const [selectedDiv, setSelectedDiv] = useState(null);
  const [selectedWallet, setSelectedWallet] = useState(null);

  const handleAmountChange1 = (event) => {
    setEnteredAmount1(event.target.value);
    setAmountError1('');
  };
  const handleAmountChange2 = (event) => {
    setEnteredAmount2(event.target.value);
    setAmountError2('');
  };
  const handleAmountChange3 = (event) => {
    setEnteredAmount3(event.target.value);
    setAmountError3('');
  };
  const handleDivClick = (walletType) => {
    console.log('Clicked wallet type:', walletType);
    console.log('Current selected wallet:', selectedWallet);
    setSelectedWallet(walletType === selectedWallet ? null : walletType);
    console.log('Updated selected wallet:', selectedWallet);
  };

  const handleDepositClick = () => {
    if (parseInt(enteredAmount1, 10) < 10000) {
      setAmountError1('Minimum amount is $10,000');
    } else {
      setAmountError1(''); // No error message
    }
  };

  return (
    <div className="flex gap-[5%] flex-wrap justify-center items-center mt-10 max-xl:flex-col max-xl:gap-[10%]">
      <MakeDeposit />
      <MakeDeposit />
      <MakeDeposit />
    </div>
  );
};

export default PricingPlan;
