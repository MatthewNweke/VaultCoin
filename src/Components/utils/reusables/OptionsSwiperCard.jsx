import React from 'react'

const OptionsSwiperCard = () => {
    return (
        <div className="relative flex flex-col items-center">
          <img
            src={image}
            alt=""
            className="-mb-[13rem] md:-mb-[20rem] z-20 h-[25rem] md:h-[35rem]"
          />
    
          <div className="h-[30rem] md:h-[35rem] w-full md:w-[45rem] bg-gray-100 rounded-3xl py-5 px-5 md:px-24 flex flex-col justify-center">
            <ul className="list-disc list-inside text-base md:text-xl tracking-wide text-[#546988] mt-[1rem] md:mt-[10rem]">
              {items?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      );
}

export default OptionsSwiperCard
