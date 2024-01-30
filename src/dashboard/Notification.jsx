import PricingPlan from "../components/PricingPlan";

const Notification = () => {
  return (
    <div>
      <div className="min-h-[500px] shadow-xl rounded px-5 py-10">
        <p className='py-10'>All Notification</p>
        <div className="border border-[#00000020] hover:text-blue-500 border-x-0 p-5 cursor-pointer">
          <p>Deposit</p>
          <p>Your deposit was received and will be processed</p>
          <p className=" text-[0.7rem]">14 jan 2024 04:46:16</p>
        </div>
        <div className="border border-[#00000020] hover:text-gbluereen-500 border-x-0 p-5 cursor-pointer">
          <p>Deposit</p>
          <p>Your deposit was received and will be processed</p>
          <p className=" text-[0.7rem]">14 jan 2024 04:46:16</p>
        </div>
        <div className="border border-[#00000020] hover:text-green-500 border-x-0 p-5 cursor-pointer">
          <p>Deposit</p>
          <p>Your deposit was received and will be processed</p>
          <p className=" text-[0.7rem]">14 jan 2024 04:46:16</p>
        </div>
        <div className="border border-[#00000020] hover:text-green-500 border-x-0 p-5 cursor-pointer">
          <p>Deposit</p>
          <p>Your deposit was received and will be processed</p>
          <p className=" text-[0.7rem]">14 jan 2024 04:46:16</p>
        </div>
        
        <div className="border border-[#00000020] hover:text-green-500 border-x-0 p-5 cursor-pointer">
          <p>Deposit</p>
          <p>Your deposit was received and will be processed</p>
          <p className=" text-[0.7rem]">14 jan 2024 04:46:16</p>
        </div>
        <div className="border border-[#00000020] hover:text-green-500 border-x-0 p-5 cursor-pointer">
          <p>Deposit</p>
          <p>Your deposit was received and will be processed</p>
          <p className=" text-[0.7rem]">14 jan 2024 04:46:16</p>
        </div>
      </div>

      <PricingPlan/>
    </div>
  );
};

export default Notification;
