const Contact = () => {
  return (
    <div>
      <div className="min-h-[500px] shadow-xl py-10 w-[90%] mx-auto my-0 p-5">
        <p className="p-5 border-[#00000020] border mb-5 text-xl">Contact Support</p>
        <p className="text-green-300 text-xl font-semibold mb-5">Write Us a Message...</p>
        <form action="" className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <label htmlFor="" className="font-semibold">Full Name</label>
            <input type="text" className="w-[100%] rounded p-3" placeholder="Enter Name *" />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="" className="font-semibold">Email Address</label>
            <input type="email" className="w-[100%] rounded p-3" placeholder="Enter Email *"/>
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="" className="font-semibold">Subject</label>
            <input type="text" className="w-[100%] rounded p-3" placeholder="Enter Subject *" />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="" className="font-semibold">Message</label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              className="w-[100%]"
              placeholder="Message *"
            ></textarea>
          </div>
          <input type="submit"  className=" w-[100%] rounded p-3 bg-blue-700 text-white cursor-pointer" value={"Send a Message"} />
        </form>
      </div>
    </div>
  );
};

export default Contact;
