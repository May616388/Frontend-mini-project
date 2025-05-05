import React from "react";
import bgFlower from "../../src/assets/flower.png";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-[#EEF2D9]">
      <img src={bgFlower} alt="flower drawing" className="h-90 w-98 mt-8 lg:mt-8 lg:h-122 lg:w-132"/>
    <h1 className="bg-[#FFCE43] px-5 py-3 text-[#191923] text-2xl font-medium mt-4 lg:bg-[#FFCE43] lg:px-5 lg:py-3 lg:text-[#191923] lg:text-4xl lg:font-medium lg:mt-4">Hello! So glad you’re here.</h1>
    <p className="text-[#191923] text-base font-normal mt-4 lg:text[#191923] lg:text-xl lg:font-normal lg:mt-4">Get ready to organize your world,</p>
    <p className="text-[#191923] text-base font-normal lg:text[#191923] lg:text-xl lg:font-normal">one note at a time. Welcome to NotesApp!</p>
    <button className="justify-center items-center bg-[#191923] text-base font-medium text-white px-4 py-3 w-44 h-12 mt-10 rounded-full hover:shadow-lg lg:ustify-center lg:items-center lg:text-xl lg:font-medium lg:text-white lg:px-4 lg:py-3 lg:w-64 lg:h-12 lg:rounded-full lg:hover:shadow-lg">Log in</button>
    </div>
  );
};

export default HomePage;