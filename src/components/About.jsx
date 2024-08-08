import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Instagram, Twitter, Github, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const SocialLink = ({ Icon, href, label }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-white transition-colors duration-300"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    <Icon size={28} aria-label={label} />
  </motion.a>
);

const MarqueeImages = ({ direction = "left" }) => {
  const localImages = [
    "/images/marq1.png",
    "/images/marq2.png",
    "/images/marq3.png",
    "/images/marq4.png",
    "/images/marq5.png",
    "/images/marq6.png",
    "/images/marq7.png",
    "/images/marq8.png",
    "/images/marq9.png",
    "/images/marq10.png",
    "/images/marq11.png",
    "/images/marq12.png",
    "/images/marq13.png",
    "/images/marq14.png",
    "/images/marq15.png",
    "/images/marq16.png",
    "/images/marq17.png",
  ];

  return (
    <div className="overflow-hidden my-20">
      <motion.div
        className="flex"
        animate={{
          x: direction === "left" ? [0, -1920] : [-1920, 0],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 60,
            ease: "linear",
          },
        }}
      >
        {[...localImages, ...localImages].map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Gallery image ${i}`}
            className="w-[350px] h-[270px] object-cover"
          />
        ))}
      </motion.div>
    </div>
  );
};

const AboutUs = () => {
  const aboutRef = useRef(null);
  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const topImages = [
    "/images/gal14.png",
    "/images/gal12.png",
    "/images/gal13.png",
  ];
  const bottomImages = [
    "/images/gal4.png",
    "/images/gal5.png",
    "/images/gal15.png",
  ];

  const creatorImagePlaceholder = "/images/dp2.jpg";
  const backgroundImageUrl = "/images/bg9.jpg";

  return (
    <div className="bg-black text-white min-h-screen font-serif rounded-b-[30px]">
      <div
        className="h-screen bg-cover bg-center flex flex-col justify-center items-start px-16"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-16 max-w-2xl"
        >
          <h1 className="text-8xl mb-4 font-bold text-zinc-700 font-[Kalnia] ">
            PixelPerfect
          </h1>
          <h2 className="text-6xl mb-8 text-zinc-700 opacity-90 font-[pacifico]">
            Gallery
          </h2>
          <p className="text-xl mb-8 text-black opacity-80 font-[roboto] ">
            Welcome to PixelPerfect Gallery, where art meets technology. We're
            reimagining the way you experience photography online. Our platform
            brings together a world of visual inspiration, powered by
            cutting-edge AI and the vast Unsplash library. Get ready to embark
            on a journey that will transform your perception of digital imagery.
          </p>
          <div className="flex space-x-4">
            <Link
              to="/gallery"
              className="bg-white text-black px-8 py-3 text-lg font-semibold rounded-md hover:bg-gray-200 transition-colors duration-300 hover:bg-transparent hover:border-2 hover:border-white hover:text-white font-[Kalnia] "
            >
              EXPLORE NOW
            </Link>
            <button
              onClick={scrollToAbout}
              className="border-2 border-white text-white px-8 py-3 text-lg font-semibold rounded-md hover:bg-white hover:text-black transition-colors duration-300 font-[Kalnia]"
            >
              LEARN MORE
            </button>
          </div>
        </motion.div>
      </div>
      <div className="container mx-auto px-4 py-16">
        <MarqueeImages direction="left" />

        <motion.div
          ref={aboutRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mb-16 relative pt-28"
          id="about"
          style={{ minHeight: "1400px" }}
        >
          <h2 className="text-7xl mb-12 italic pl-4 font-[Pacifico] ">
            About Us
          </h2>

          <div className="flex mb-5 h-[80vh] pt-8 pb-5 px-2">
            <div className="w-1/2 pr-[170px]">
              <p
                className="text-gray-300 mb-12 text-xl mt-12 font-[Roboto]"
              >
                At PixelPerfect Gallery, we've crafted a unique space where
                technology and creativity converge. Our platform harnesses the
                power of the Unsplash API to curate an ever-evolving collection
                of exceptional photographs. From awe-inspiring landscapes and
                candid street scenes to abstract art and intimate portraits, our
                gallery spans the full spectrum of photographic expression.
              </p>
              <p className="text-gray-300 mb-6 text-xl font-[Roboto]">
                What sets us apart is our commitment to showcasing both
                established masters and emerging talents. Our AI-driven curation
                ensures that each visit to PixelPerfect offers a fresh
                perspective, adapting to current trends and personal
                preferences.
              </p>
            </div>
            <div className="w-1/2 relative" style={{ height: "470px" }}>
              {topImages.map((img, index) => (
                <motion.img
                  key={index}
                  src={img}
                  alt={`Gallery showcase ${index + 1}`}
                  className="absolute object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.2 }}
                  style={{
                    ...(index === 0 && {
                      top: "0%",
                      left: "0%",
                      width: "60%",
                      height: "70%",
                    }),
                    ...(index === 1 && {
                      top: "10%",
                      right: "0%",
                      width: "50%",
                      height: "60%",
                    }),
                    ...(index === 2 && {
                      bottom: "-10%",
                      left: "16%",
                      width: "60%",
                      height: "65%",
                    }),
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex pt-5 pb-4 px-2 h-[80vh] ">
            <div className="w-1/2 relative " style={{ height: "470px" }}>
              {bottomImages.map((img, index) => (
                <motion.img
                  key={index}
                  src={img}
                  alt={`Gallery showcase ${index + 4}`}
                  className="absolute object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 + index * 0.2 }}
                  style={{
                    ...(index === 0 && {
                      top: "0%",
                      left: "0%",
                      width: "60%",
                      height: "60%",
                    }),
                    ...(index === 1 && {
                      top: "20%",
                      right: "-5%",
                      width: "50%",
                      height: "70%",
                    }),
                    ...(index === 2 && {
                      bottom: "-10%",
                      left: "16%",
                      width: "60%",
                      height: "63%",
                    }),
                  }}
                />
              ))}
            </div>
            <div className="w-1/2 pl-24 pt-8">
              <p className="text-gray-300 mb-6 text-xl font-[Roboto] ">
                We're thrilled to announce that we're pushing the boundaries of
                creativity even further. Currently in development is our
                groundbreaking AI image generation feature. This innovative tool
                will allow users to create unique, stunning visuals based on
                textual descriptions or style preferences.
              </p>
              <p className="text-gray-300 mb-6 text-xl font-[Roboto]">
                Join us in celebrating the democratization of photography and
                the future of digital art. At PixelPerfect, every frame tells a
                story, every image opens a window to new worlds, and soon, your
                imagination will be the only limit to the visuals you can
                create.
              </p>
              <p className="text-gray-300 mb-6 text-xl font-[Roboto]">
                Step into our gallery and rediscover the power of visual
                storytelling in the digital age, where curation meets creation.
              </p>
            </div>
          </div>
        </motion.div>

        <MarqueeImages direction="right" />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-32 flex flex-col lg:flex-row items-center lg:items-start space-y-12 lg:space-y-10 pb-10 lg:space-x-16 "
        >
          <motion.div
            className="lg:w-2/5 flex justify-center"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src={creatorImagePlaceholder}
              alt="Prateek Singh Chouhan"
              className="w-[370px] h-[370px] object-cover rounded-[50px] shadow-2xl mt-14"
            />
          </motion.div>

          <motion.div
            className="lg:w-3/5"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-5xl font-bold mb-8 text-white font-[Pacifico] ">
              About the Creator
            </h2>
            <motion.p
              className="text-gray-300 text-xl mb-6 leading-relaxed font-[Roboto] "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Hello! I'm Prateek Singh Chouhan, a 4th year B.Tech student from
              Bhopal, India. As a passionate digital designer and developer,
              I've created PixelPerfect Gallery to showcase the beauty of visual
              storytelling.
            </motion.p>
            <motion.p
              className="text-gray-300 text-xl mb-6 leading-relaxed font-[Roboto] "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              My expertise lies in crafting distinctive visual identities for
              digital products. Through this gallery, I aim to blend my
              technical skills with my love for aesthetics, creating an
              immersive experience for art enthusiasts and casual browsers
              alike.
            </motion.p>
            <motion.p
              className="text-gray-300 text-xl mb-8 leading-relaxed font-[Roboto] "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              As a digital designer, my goal is to push the boundaries of what's
              possible in web design, always striving to create interfaces that
              are both beautiful and functional. PixelPerfect Gallery is a
              testament to this vision, offering a seamless blend of technology
              and art.
            </motion.p>
            <motion.div
              className="flex space-x-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <SocialLink
                Icon={Instagram}
                href="https://www.instagram.com/__.prateeeeek.__/"
                label="Instagram"
              />
              <SocialLink
                Icon={Twitter}
                href="https://x.com/Prateeeeek_"
                label="Twitter"
              />
              <SocialLink
                Icon={Github}
                href="https://github.com/Prateeksingchn"
                label="GitHub"
              />
              <SocialLink
                Icon={Linkedin}
                href="https://www.linkedin.com/in/prateek-singh-chouhan-654486243/"
                label="LinkedIn"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
