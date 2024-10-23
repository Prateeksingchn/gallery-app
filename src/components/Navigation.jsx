import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useMediaQuery } from 'react-responsive';

const navItems = [
  { name: "Home", path: "/" },
  { name: "Gallery", path: "/gallery" },
  { name: "Collection", path: "/collections" },
  { name: "About", path: "/about" },
];

const NavItem = ({ item, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === item.path;
  const isLargeDevice = useMediaQuery({ minWidth: 1024 });

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="overflow-hidden"
    >
      <Link
        to={item.path}
        onClick={onClick}
        className={`block px-3 py-2 text-3xl md:text-4xl lg:text-[4.5rem] uppercase font-serif ${
          isActive ? "text-red-500" : "text-gray-800 hover:text-red-500"
        } mb-6 lg:mb-0 transition-colors duration-300 relative`}
        onMouseEnter={() => {
          if (isLargeDevice) {
            document.body.style.cursor = 'none';
          }
        }}
        onMouseLeave={() => {
          if (isLargeDevice) {
            document.body.style.cursor = 'auto';
          }
        }}
      >
        <motion.span
          initial={{ y: 0 }}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          {item.name}
        </motion.span>
        <motion.div
          className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      </Link>
    </motion.div>
  );
};

const FloatingNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isLargeDevice = useMediaQuery({ minWidth: 1024 });

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    open: {
      opacity: 1,
      height: "100vh",
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const menuItemVariants = {
    closed: { y: 20, opacity: 0 },
    open: i => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        ease: [0.175, 0.885, 0.32, 1.275], // Bouncy effect
      },
    }),
  };

  const handleMouseEnter = () => {
    if (isLargeDevice) {
      document.body.style.cursor = 'none';
    }
  };

  const handleMouseLeave = () => {
    if (isLargeDevice) {
      document.body.style.cursor = 'auto';
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-3xl font-normal text-[#121212] hover:text-red-900 transition-colors duration-300 font-['Baskervville']"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              PixelPerfect
            </Link>
          </div>
          <div className="z-50">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-full text-[#121212] hover:bg-red-500 hover:text-white focus:outline-none transition-all duration-300"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span className="sr-only">Open main menu</span>
              <motion.div
                animate={isOpen ? "open" : "closed"}
                variants={{
                  open: { rotate: 180 },
                  closed: { rotate: 0 },
                }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-x-0 top-0 bg-[#ECE8E2] overflow-hidden flex flex-col justify-center items-center shadow-xl"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div 
              className="w-full h-full flex flex-col lg:flex-row justify-center items-center"
              variants={{
                open: {
                  transition: { staggerChildren: 0.05, delayChildren: 0.1 }
                },
                closed: {
                  transition: { staggerChildren: 0.03, staggerDirection: -1 }
                }
              }}
            >
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  custom={i}
                  variants={menuItemVariants}
                  className="lg:mx-4"
                >
                  <NavItem
                    item={item}
                    onClick={closeMenu}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default FloatingNavigation;
