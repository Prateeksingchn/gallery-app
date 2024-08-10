import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Footer = () => {
  const [email, setEmail] = useState("");
  const controls = useAnimation();
  const [ref, inView] = useInView();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Subscribed with email:", email);
    setEmail("");
  };

  React.useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <footer className="bg-white text-black w-full">
      {/* top Section */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 pt-6 lg:pt-12 md:pt-12 w-full h-auto pb-8"
      >
        <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:gap-8 md:gap-0">

          {/* footer intro */}
          <div className=" w-[300px] lg:w-[700px] md:w-[320px] ">
            <h2 className="text-4xl font-semibold mb-4 font-[pacifico] ">
              Say Hello
            </h2>
            <div className="mb-2 mt-20 lg:mt-48 md:mt-48">
              <h3 className="font-semibold">Stay updated on news</h3>
              <form
                onSubmit={handleSubmit}
                className="flex mt-2 border-2 border-zinc-400 rounded-full overflow-hidden bg-white"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  className="bg-white text-black p-2 rounded-l flex-grow"
                />
                <button
                  type="submit"
                  className="bg-[#F8D347] rounded-full m-[1.2px] text-sm text-black font-bold p-2 hover:bg-gray-800 hover:text-white transition duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
            <p className="text-xs">
              &copy; PixelPerfect 2024. All rights reserved
            </p>
          </div>

          {/* follow us */}
          <div className="lg:ml-72 md:ml-[100px]  w-[300px] lg:w-[300px] md:w-[180px] mt-10 md:mt-0 lg:mt-0 md:text-base text-sm ">
            <div className="flex flex-row lg:flex-col md:flex-col lg:gap-0 md:gap-5 gap-8">
              <div className="flex flex-col">
                <h3 className="font-bold mb-1">New business</h3>
                <p>viki@PixelPerfect.com</p>
              </div>
              <div className="flex flex-col">
                <h3 className="font-bold mt-0 lg:mt-4 md:mt-0 mb-1">Join us</h3>
                <p>hello@PixelPerfect.com</p>
              </div>
            </div>
            <div className="flex md:flex-row lg:flex-col lg:gap-0 -gap-14 md:gap-36 mt-0 md:mt-[50px] lg:mt-0">
              <div className="flex flex-col">
                <h3 className="font-bold mt-4 mb-1">Follow us</h3>
                <ul>
                  <li>
                    <a href="#" className="hover:underline">
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Twitter
                    </a>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col ml-28 lg:ml-0 md:ml-0 mt-0 lg:mt-4">
                <h3 className="font-bold md:mt-4 mt-4 lg:mt-0  mb-1">Legal</h3>
                <ul>
                  <li>
                    <Link to="/cookies" className="hover:underline">
                      Cookie Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/privacy" className="hover:underline">
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:ml-24 ml-0 md:ml-[70px] mt-5 lg:mt-0 md:mt-0 w-[300px] lg:w-[300px] md:w-[180px] text-sm ">
            <h3 className="font-bold mb-1">Contact</h3>
            <p>Studio 402</p>
            <p>Makateb Building Two</p>
            <p>Production City, Dubai</p>
            <p className="mt-2">+971 (0)4 420 7025</p>
            <a href="#" className="underline mt-2 inline-block mb-2">
              See on Map
            </a>
          </div>
        </div>
      </motion.div>

      {/* Bottom Footer */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            delay: 0.2,
          },
        }}
        exit={{ opacity: 0, y: 50 }}
        className="bg-[#F8D347] pt-12 w-full lg:h-[350px] md:h-[250px] overflow-hidden flex items-end justify-center"
      >
        <div className="container mx-auto px-4 flex items-end justify-center overflow-hidden">
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                delay: 0.4,
              },
            }}
            exit={{ opacity: 0, y: 100 }}
            className="text-[80px] md:text-[9.7rem] lg:text-[20rem] leading-[70px] lg:leading-[13rem] md:leading-[100px] mt-4 tracking-tighter lg:tracking-[-0.07em] md:tracking-tighter font-bold font-[roboto]"
          >
            PixelPerfect
          </motion.h1>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
