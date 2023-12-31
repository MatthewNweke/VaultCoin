import React from 'react';

const CoinBg = (props) => {
  const activities = [

  ];
  return (
    <div
      className="min-h-[100vh] w-[100%] text-gray-100"
      style={{
        backgroundImage: 'url("/businessman-checking-stock-market-online.jpg") ',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="text-gray-50 flex flex-col justify-center min-h-[100vh] leading-[4rem] ml-40  max-md:ml-20 max-sm:ml-10">
        <p className="font-bold text-[2.3rem] laviossa text-gray-50 max-md:text-[2rem] max-sm:text-[1.5rem]">
          {' '}
          {props.title}
        </p>
        <p className="cursor-pointer text-[1.2rem] max-sm:text-[1rem]">
          <span className="hover:text-[#D04029]">Home - </span> {props.description}
        </p>
      </div>
    </div>
  );
};

export default CoinBg;
