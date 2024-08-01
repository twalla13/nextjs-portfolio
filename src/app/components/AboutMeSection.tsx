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
         <div className="grid flex-row grid-cols-1 md:grid-cols-3 gap-16">
          <div className="relative flex-shrink-0 w-[377.67px] h-[452px]" style={{ transform: 'rotate(-4deg)' }}>
            <div className="p-4 h-full" style={{
              backgroundColor: '#FFE68C',
              borderRadius: '8px',
              border: '5px solid #EECD56',
              boxShadow: '5px 5px 20px 0px rgba(255, 230, 140, 0.13)'
            }}>
              <h3 className="custom-text ">Card 1</h3>
              <p>This is the first card.</p>
            </div>
          </div>
          <div className="relative flex-shrink-0 w-[377.67px] h-[452px] " style={{ transform: 'rotate(4deg)' }}>
            <div className="p-4 h-full" style={{
              backgroundColor: '#9DDCFF',
              borderRadius: '8px',
              border: '5px solid #5AB5E8',
              boxShadow: '5px 5px 20px 0px rgba(255, 230, 140, 0.13)'
            }}>
              <h3 className="text-xl font-bold">Card 2</h3>
              <p>This is the second card.</p>
            </div>
          </div>
          <div className="relative flex-shrink-0 w-[377.67px] h-[452px]" style={{ transform: 'rotate(-4deg)' }}>
            <div className="p-4 h-full" style={{
              backgroundColor: '#FFC9F0',
              borderRadius: '8px',
              border: '5px solid #F384D4',
              boxShadow: '5px 5px 20px 0px rgba(255, 230, 140, 0.13)'
            }}>
              <h3 className="text-xl font-bold">Card 3</h3>
              <p>This is the third card.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
);

export default AboutMeSection;
