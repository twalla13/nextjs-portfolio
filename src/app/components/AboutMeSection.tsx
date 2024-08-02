/* eslint-disable @next/next/no-img-element */
import React from "react";
const AboutMeSection = () => (
 <section id= "about" className="flex items-center justify-center p-8">
      <div className="grid grid-cols-1 gap-4">
        <div className="relative flex justify-start mb-2">
          <img
            src="/imgs/whatido.png"
            alt="What I do"
            className="w-164 h-153"
          />
        </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 xl:gap-20">
        {/* Card 1 */}
          <div  className="relative w-full md:w-[280px] lg:w-[300px] xl:w-[350px] 2xl:w-[377.67px] h-[380px] md:h-[400px] lg:h-[420px] xl:h-[440px] 2xl:h-[452px]" style={{ transform: 'rotate(-4deg)' }}>
            <div className="p-4 h-full flex flex-col items-center justify-center" style={{
              backgroundColor: '#FFE68C',
              borderRadius: '8px',
              border: '5px solid #EECD56',
              boxShadow: '5px 5px 20px 0px rgba(255, 230, 140, 0.13)'
            }}>
              <h3 className="custom-text absolute top-[80px] right-[-40px]" style={{ backgroundColor: '#9DDCFF', transform: 'rotate(4deg)' }}>Cloud Services</h3>
              <p className="font-body text-2xl text-center" style={{transform: 'rotate(4deg)'}}>Utilize AWS and Azure for scalable, efficient cloud solutions.</p>
            </div>
          </div>
          {/* Card 2 */}
          <div  className="relative w-full md:w-[280px] lg:w-[300px] xl:w-[350px] 2xl:w-[377.67px] h-[380px] md:h-[400px] lg:h-[420px] xl:h-[440px] 2xl:h-[452px]" style={{ transform: 'rotate(4deg)' }}>
            <div className="p-4 h-full flex flex-col items-center justify-center" style={{
              backgroundColor: '#9DDCFF',
              borderRadius: '8px',
              border: '5px solid #5AB5E8',
              boxShadow: '5px 5px 20px 0px rgba(255, 230, 140, 0.13)'
            }}>
              <h3 className="custom-text absolute top-[-20px] " style={{ transform: 'rotate(-4deg)' }}>Object Orientated Programming</h3>
              <p className="font-body text-2xl" style={{transform: 'rotate(-4deg)' }}>Develop scalable, maintainable software using Java, C++, and Python.</p>
            </div>
          </div>
          {/* Card 3 */}
          <div  className="relative w-full md:w-[280px] lg:w-[300px] xl:w-[350px] 2xl:w-[377.67px] h-[380px] md:h-[400px] lg:h-[420px] xl:h-[440px] 2xl:h-[452px]"style={{ transform: 'rotate(-4deg)' }}>
            <div className="p-4 h-full flex flex-col items-center justify-center" style={{
              backgroundColor: '#FFC9F0',
              borderRadius: '8px',
              border: '5px solid #F384D4',
              boxShadow: '5px 5px 20px 0px rgba(255, 230, 140, 0.13)'
            }}>
              <h3 className="custom-text absolute bottom-[320px] right-[-40px]" style={{ backgroundColor: '#FFE68C', transform: 'rotate(4deg)' }}>Web Development</h3>
              <p className="font-body text-2xl text-center" style={{transform: 'rotate(4deg)' }}>Create responsive, dynamic web applications with React, NextJS, Node.js, and TypeScript.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
);

export default AboutMeSection;
