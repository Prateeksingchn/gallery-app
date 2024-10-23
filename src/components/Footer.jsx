import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Footer = () => {
  const [email, setEmail] = useState("");
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Subscribed with email:", email);
    setEmail("");
  };

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <footer className="bg-white text-black w-full">
      {/* Top Section */}
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 md:px-14 lg:px-10 py-8 lg:py-12 w-full "
      >
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-10 gap-8 lg:gap-12">
          {/* Footer intro */}
          <div className="md:col-span-2 lg:col-span-6">
            <h2 className="text-4xl lg:text-5xl font-semibold mb-6 font-['Pacifico',_cursive] text-gray-800">
              Say Hello
            </h2>
            <div className="mb-4 mt-8 lg:mt-12">
              <h3 className="font-semibold text-lg mb-3">Stay updated on news</h3>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row mt-2 border-2 border-gray-300 rounded-lg sm:rounded-full overflow-hidden bg-white shadow-sm"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  className="bg-white text-black p-3 flex-grow focus:outline-none w-full"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#F8D347] text-sm md:text-base text-black font-bold px-6 py-3 hover:bg-gray-800 hover:text-white transition duration-300 ease-in-out w-full sm:w-auto"
                >
                  Subscribe
                </button>
              </form>
            </div>
            <p className="text-sm text-gray-600">
              &copy; PixelPerfect {new Date().getFullYear()}. All rights reserved
            </p>
          </div>

          {/* Follow us */}
          <div className="col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
              <div>
                <h3 className="font-bold text-lg mb-1">New business</h3>
                <p className="text-gray-600 text-sm md:text-base">viki@PixelPerfect.com</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Join us</h3>
                <p className="text-gray-600 text-sm md:text-base">hello@PixelPerfect.com</p>
              </div>
            </div>
            <div className="mt-6 lg:mt-8">
              <h3 className="font-bold text-lg mb-2">Follow us</h3>
              <ul className="space-y-2">
                {['LinkedIn', 'Instagram', 'Twitter'].map((social) => (
                  <li key={social}>
                    <a href="#" className="text-gray-600 text-sm md:text-base hover:text-black transition duration-300">
                      {social}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Info and Legal */}
          <div className="md:col-span-1 lg:col-span-2">
            <h3 className="font-bold text-lg mb-3">Contact</h3>
            <address className="not-italic text-gray-600 text-sm md:text-base">
              <p>Studio 402</p>
              <p>Makateb Building Two</p>
              <p>Production City, Dubai</p>
              <p className="mt-2">+971 (0)4 420 7025</p>
            </address>
            <a href="#" className="inline-block mt-3 text-sm md:text-base text-black border-b-2 border-[#F8D347] hover:border-black transition duration-300">
              See on Map
            </a>
            <div className="mt-6 lg:mt-8">
              <h3 className="font-bold text-lg mb-2">Legal</h3>
              <ul className="space-y-2">
                {[
                  { to: "/cookies", text: "Cookie Policy" },
                  { to: "/privacy", text: "Privacy Policy" },
                ].map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-gray-600 text-sm md:text-base hover:text-black transition duration-300">
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
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
        className="bg-[#F8D347] pt-8 md:pt-16 lg:pt-20 w-full h-[100px] sm:h-[170px] md:h-[200px] lg:h-[300px] overflow-hidden flex items-end justify-center"
      >
        <div className=" flex items-end justify-center overflow-hidden h-full">
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
            className="text-[3.7rem] sm:text-[8rem] md:text-[10rem] lg:text-[19rem] leading-none tracking-tighter font-bold font-[roboto] text-black mb-[-0.2em]"
          >
            PixelPerfect
          </motion.h1>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
