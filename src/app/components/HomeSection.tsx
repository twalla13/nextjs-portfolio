/* eslint-disable @next/next/no-img-element */
import React from 'react';

const HomeSection = () => (
  <section id="homepage" className="mx-auto flex lg:mx-48 flex-col lg:flex-row items-center justify-center">
    <div className="relative">
      <img
        src="/imgs/homepagegirl.png"
        alt="Homepage Girl"
        className="w-40 h-40 md:w-[256px] md:h-[256px] lg:w-[512px] lg:h-[512px] xl:w-[1024px] xl:h-[1024px]"
        style={{ 
          maxWidth: '100%', 
          height: 'auto',
          maskImage: 'radial-gradient(circle, white 60%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(circle, white 60%, transparent 100%)'
        }}
      />
     <div className="absolute top-10 left-1 md:left-16 lg:top-12 lg:left-1/3 transform -translate-x-1/2 -translate-y-1/2 flex items-center">
        <span className="custom-text text-s md:text-2xl mr-5">toni</span>
          <img
            src="/imgs/arrow.svg"
            alt="Arrow"
            className=" sm:w-6 sm:h-6 md:w-12 md:h-12 lg:w-[36px] lg:h-[68px] transform scale-x-[-1] rotate-[-70deg]"
          />
    </div>
    </div>
    <div className="text-center mt-6 p-4 lg:text-left lg:p-2">
      <h1 className="font-display text-2xl md:text-3xl lg:text-6xl font-bold mb-4">Toniann Wallace: Crafting Digital Solutions</h1>
      <p className="mb-4 font-display lg:text-2xl sm:mx-4">With degrees in Math and Software Engineering, I am a full stack engineer skilled in problem-solving and multiple coding languages. Outgoing and ready to innovate.</p>
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Hire Me</button>
    </div>
  </section>
);

export default HomeSection;