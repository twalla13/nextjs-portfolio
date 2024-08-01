/* eslint-disable @next/next/no-img-element */
import React from 'react';

const HomeSection = () => (
  <section id="homepage" className="mx-auto md:mx-48 flex flex-col lg:flex-row items-center justify-center">
      <div>
        <img
          src="/imgs/homepagegirl.png"
          alt="Homepage Girl"
          className="w-90 h-105 rounded-full"
        />
      </div>
      <div className="text-center mt-6 lg:text-left lg:p-2">
        <h1 className="font-display text-3xl lg:text-6xl font-bold mb-4">Toniann Wallace: Crafting Digital Solutions</h1>
        <p className="mb-4 font-display lg:text-2xl">With degrees in Math and Software Engineering, I am a full stack engineer skilled in problem-solving and multiple coding languages. Outgoing and ready to innovate.</p>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Hire Me</button>
      </div>
    </section>
);

export default HomeSection;