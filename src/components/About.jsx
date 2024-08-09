import React, { useRef, useEffect } from "react";
import AboutIntroSection from "./About/AboutIntroSection";
import Marquee from "./About/Marquee";
import AboutContent from "./About/AboutContent";
import AboutCreator from "./About/AboutCreator";

const About = () => {
  const aboutRef = useRef(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const backgroundImageUrl = "/images/bg9.jpg";
  const creatorImagePlaceholder = "/images/dp2.jpg";

  return (
    <div className="bg-black text-white w-full min-h-screen font-serif overflow-x-hidden">
      <AboutIntroSection 
        backgroundImageUrl={backgroundImageUrl} 
        scrollToAbout={scrollToAbout} 
      />

      <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-20 py-16">
        <Marquee direction="left" />

        <AboutContent aboutRef={aboutRef} />

        <Marquee direction="right" />

        <AboutCreator creatorImagePlaceholder={creatorImagePlaceholder} />
      </div>
    </div>
  );
};

export default About;