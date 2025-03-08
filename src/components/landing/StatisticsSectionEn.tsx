
import React, { useEffect, useRef } from "react";
import { Users, Book, Award } from "lucide-react";

export const StatisticsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16 px-4 bg-texture-dark">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-[#F5E9D7] text-3xl font-montserrat font-bold text-center mb-12">
          The Pizzametrix Community
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center p-6 rounded-lg bg-gradient-dark animate-on-scroll">
            <div className="bg-gradient-primary w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div className="counter text-[#F5E9D7] text-4xl font-montserrat font-bold mb-2">1,000+</div>
            <p className="text-[#F5E9D7]/80 text-center">Passionate pizza makers</p>
          </div>
          
          <div 
            className="flex flex-col items-center p-6 rounded-lg bg-gradient-dark animate-on-scroll" 
            style={{ animationDelay: "200ms" }}
          >
            <div className="bg-gradient-primary w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Book className="w-8 h-8 text-white" />
            </div>
            <div className="counter text-[#F5E9D7] text-4xl font-montserrat font-bold mb-2">7,600+</div>
            <p className="text-[#F5E9D7]/80 text-center">Recipes created</p>
          </div>
          
          <div 
            className="flex flex-col items-center p-6 rounded-lg bg-gradient-dark animate-on-scroll" 
            style={{ animationDelay: "400ms" }}
          >
            <div className="bg-gradient-primary w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <div className="counter text-[#F5E9D7] text-4xl font-montserrat font-bold mb-2">98%</div>
            <p className="text-[#F5E9D7]/80 text-center">Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
};
