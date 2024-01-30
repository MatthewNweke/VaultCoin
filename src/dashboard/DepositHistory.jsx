import PricingPlan from '../components/PricingPlan';

const DepositHistory = () => {
  return (
    <div className=''>
      <div className="px-3 mt-5111 bg-white relative bottom-6 py-3 w-[90%] translate-x-[-50%] left-1/2 m-0 rounded shadow-lg">
        <p className=" py-5  font-semibold text-[1.2rem] ">All Transactions</p>
        <div className="bg-blue-700 rounded h-[5rem] py-8 flex justify-around items-center cursor-pointer hover:bg-[#00000010]  ">
          <div>
            <p>Deposit#STPM2398</p>{' '}
            <p className="text-[0.5rem]">05 Jan 2024 04:27:47 pm</p>
          </div>
          <p>$20,000.00</p>
          <p className=" font-bold">Success</p>
        </div>
        <div className="bg-[#00000020] my-3 rounded h-[5rem] py-8 flex justify-around items-center cursor-pointer hover:bg-[#00000010]  ">
          <div>
            <p>Deposit#STPM2398</p>{' '}
            <p className="text-[0.5rem]">05 Jan 2024 04:27:47 pm</p>
          </div>
          <p>$20,000.00</p>
          <p className=" font-bold">Pending</p>
        </div>
      </div>

      <PricingPlan />
    </div>
  );
};

export default DepositHistory;
