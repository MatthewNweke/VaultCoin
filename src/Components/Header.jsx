import { Link } from "react-router-dom";



// bg-[#30022ECC]
const Header = () => {
  return (
    <div className="w-full flex justify-between items-center py-5 px-5 lg:px-10 xl:px-20 bg-[#00000090] shadow-md fixed z-40 top-0 left-0">
      <img src="/FxLogo.png" alt="" />
      <div className="flex items-center gap-16">
        <p className="font-semibold text-white text-sm cursor-pointer">Home</p>
        <div className=" cursor-pointer">
         <Link to="/Plan"><p className="font-semibold text-white text-sm">Plan</p></Link> 
        </div>
        <div className="  cursor-pointer">
        <Link to="/about"><p className="font-semibold text-white text-sm">About</p></Link>  
        </div>
        <div className=" cursor-pointer">
       <Link to="/contact"><p className="font-semibold text-white text-sm">Contact</p></Link>   
        </div>
        <div className="flex items-center gap-2 cursor-pointer">

        </div>
        <div className=" cursor-pointer">
          <select name="language" id="language" className='cursor-pointer'>
            <option value="language">English</option>
          </select>
        </div>
      </div>
      
    </div>
  );
};

export default Header;
