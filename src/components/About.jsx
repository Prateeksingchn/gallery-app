import React, { useRef, useEffect } from "react";
import { useLocomotiveScroll } from 'react-locomotive-scroll';
import AboutIntroSection from "./About/AboutIntroSection";
import Marquee from "./About/Marquee";
import AboutContent from "./About/AboutContent";
import AboutCreator from "./About/AboutCreator";

const About = () => {
  const aboutRef = useRef(null);
  const containerRef = useRef(null);
  
  const { scroll } = useLocomotiveScroll({
    el: containerRef.current,
    smooth: true,
    multiplier: 1,
    class: 'is-revealed',
  });

  useEffect(() => {
    if (scroll) {
      scroll.update();
    }
  }, [scroll]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToAbout = () => {
    scroll.scrollTo(aboutRef.current);
  };

  const backgroundImageUrl = "/images/bg9.jpg";
  const creatorImagePlaceholder = "/images/dp2.jpg";

  return (
    <div ref={containerRef} data-scroll-container className="bg-black text-white w-full min-h-screen font-serif overflow-x-hidden">
      <AboutIntroSection 
        backgroundImageUrl={backgroundImageUrl} 
        scrollToAbout={scrollToAbout} 
      />

      <div data-scroll-section className="max-w-8xl mx-auto px-4 md:px-6 lg:px-20 py-16">
        <Marquee direction="left" />

        <AboutContent aboutRef={aboutRef} />

        <Marquee direction="right" />

        <AboutCreator creatorImagePlaceholder={creatorImagePlaceholder} />
      </div>
    </div>
  );
};

export default About;
