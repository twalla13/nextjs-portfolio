/* eslint-disable @next/next/no-img-element */
import React from "react";
const AboutMeSection = () => (
 <section id= "about" className="flex items-center justify-center lg:p-8">
      <div className="grid grid-cols-1 gap-4">
        <div className="relative flex justify-start mb-2">
          <img
            src="/imgs/whatido.png"
            alt="What I do"
            className="w-164 h-153"
          />
        </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-20 lg:gap-10">
        {/* Card 1 */}
          <div  className="relative w-full h-[240px] md:w-[240px] lg:w-full  md:h-[360px] lg:h-500" style={{ transform: 'rotate(-4deg)' }}>
            <div className="p-4 h-full flex flex-col items-center justify-center" style={{
              backgroundColor: '#FFE68C',
              borderRadius: '8px',
              border: '5px solid #EECD56',
              boxShadow: '5px 5px 20px 0px rgba(255, 230, 140, 0.13)'
            }}>
              <h3 className="custom-text absolute top-[50px] right-[-20px] md:top-[70px] md:right-[-40px]" style={{ backgroundColor: '#9DDCFF', transform: 'rotate(4deg)' }}>Cloud Services</h3>
              <p className="font-body  text-xl lg:text-2xl text-center" style={{transform: 'rotate(4deg)'}}>Utilize AWS and Azure for scalable, efficient cloud solutions.</p>
            </div>
          </div>
          {/* Card 2 */}
          <div  className="relative w-full h-[240px] md:w-[240px] lg:w-full md:h-[360px] lg:h-500" style={{ transform: 'rotate(4deg)' }}>
            <div className="p-4 h-full flex flex-col items-center justify-center" style={{
              backgroundColor: '#9DDCFF',
              borderRadius: '8px',
              border: '5px solid #5AB5E8',
              boxShadow: '5px 5px 20px 0px rgba(255, 230, 140, 0.13)'
            }}>
              <h3 className="custom-text absolute top-[-20px]" style={{ transform: 'rotate(-4deg)' }}>Object Orientated Programming</h3>
              <p className="font-body text-xl lg:text-2xl  text-center" style={{transform: 'rotate(-4deg)' }}>Develop scalable, maintainable software using Java, C++, and Python.</p>
            </div>
          </div>
          {/* Card 3 */}
          <div  className="relative w-full h-[240px] md:w-[240px] lg:w-full md:h-[360px] lg:h-full" style={{ transform: 'rotate(-4deg)' }}>
            <div className="p-4 h-full flex flex-col items-center justify-center" style={{
              backgroundColor: '#FFC9F0',
              borderRadius: '8px',
              border: '5px solid #F384D4',
              boxShadow: '5px 5px 20px 0px rgba(255, 230, 140, 0.13)'
            }}>
              <h3 className="custom-text absolute bottom-[170px] right-[-20px] md:bottom-[320px] md:right-[-40px]" style={{ backgroundColor: '#FFE68C', transform: 'rotate(4deg)' }}>Web Development</h3>
              <p className="font-body text-xl lg:text-2xl text-center" style={{transform: 'rotate(4deg)' }}>Create responsive, dynamic web applications with React, NextJS, Node.js, and TypeScript.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
);

export default AboutMeSection;
