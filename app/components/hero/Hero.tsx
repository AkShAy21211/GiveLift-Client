"use client";
import HeroButton from "../button/HeroButton";

function Hero() {
  return (
    <div className="bg-hero h-screen bg-cover bg-center bg-no-repeat flex items-center">
      <div className="flex flex-col justify-center items-start text-white text-6xl md:text-8xl font-bold p-8 md:p-16 relative top-20">
        <h1 className="sm:text-7xl">Together, we rise</h1>

        <div className=" flex flex-col  md:flex-row jmd:ustify-start md:items-center text-lg font-semibold gap-5 mt-10">
          <HeroButton
            className="bg-yellow-500 py-3 px-10 hover:bg-yellow-600"
            label="Report Disaster"
            onClick={() => {}}
          />
          <HeroButton
            className="bg-blue-600 py-3 px-10 hover:bg-blue-700"
            label="Join as volunteer"
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
