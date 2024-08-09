import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Gallery", path: "/gallery" },
  { name: "Collection", path: "/collections" },
  { name: "About", path: "/about" },
];

const NavItem = ({ item, isMobile, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === item.path;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="overflow-hidden"
    >
      <Link
        to={item.path}
        onClick={onClick}
        className={`block px-3 py-2 text-2xl md:text-lg lg:text-sm font-serif ${
          isActive ? "text-red-500" : "text-gray-800 hover:text-red-500"
        } ${isMobile ? "text-3xl mb-4" : "inline-block"}`}
      >
        {item.name}
      </Link>
    </motion.div>
  );
};

const FloatingNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
      y: "-100%",
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    open: {
      opacity: 1,
      y: "0%",
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  const menuItemVariants = {
    closed: { y: 20, opacity: 0 },
    open: i => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
      },
    }),
  };

  const backgroundVariants = {
    closed: { 
      scaleY: 0,
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    open: { 
      scaleY: 1,
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-[kalnia] text-gray-800">
              PixelPerfect
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <NavItem key={item.name} item={item} />
              ))}
            </div>
          </div>
          <div className="md:hidden">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-red-500 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              <Menu size={24} />
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="mobile-menu-background"
              initial="closed"
              animate="open"
              exit="closed"
              variants={backgroundVariants}
              className="md:hidden fixed inset-0 bg-[#ECE8E2] origin-top"
            />
            <motion.div
              key="mobile-menu"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="md:hidden fixed inset-0 overflow-hidden flex flex-col justify-center items-center"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeMenu}
                className="absolute top-4 right-4 p-2 rounded-md text-gray-800 hover:text-red-500 focus:outline-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={32} />
              </motion.button>
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.name}
                    custom={i}
                    variants={menuItemVariants}
                  >
                    <NavItem
                      item={item}
                      isMobile
                      onClick={closeMenu}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default FloatingNavigation;