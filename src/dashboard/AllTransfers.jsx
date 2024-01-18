import PricingPlan from '../components/PricingPlan';

const AllTransfers = () => {
  return (
    <div className=''>
      <div className=" rounded h-[8rem] pt-10 w-[100%] m-0 text-center">
        <p className="px-3 py-5 font-semibold text-[1.2rem]">
          History
        </p>
      </div>
      <div className="px-3 bg-white relative bottom-6 h-[8rem] w-[90%] translate-x-[-50%] left-1/2 m-0 rounded shadow-lg">
        <p className="px-3 py-5 border-b-[1px] border-[#00000010] mb-2 font-semibold text-[1.2rem] ">
        All Transfers
        </p>
      </div>
      <PricingPlan />
    </div>
  );
};

export default AllTransfers;