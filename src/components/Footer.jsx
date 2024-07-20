import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const footerLinks = [
  { name: "Home", path: "/" },
  { name: "Gallery", path: "/gallery" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const legalLinks = [
  { name: "Privacy Policy", path: "/privacy" },
  { name: "Terms of Service", path: "/terms" },
  { name: "Cookie Policy", path: "/cookies" },
];

const socialLinks = [
  { icon: Facebook, url: "#" },
  { icon: Twitter, url: "#" },
  { icon: Instagram, url: "#" },
  { icon: Mail, url: "#" },
];

const FooterLink = ({ item }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Link to={item.path} className="hover:text-red-800 transition duration-200">
      {item.name}
    </Link>
  </motion.div>
);

const SocialLink = ({ Icon, url }) => (
  <motion.a
    href={url}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="text-gray-700 hover:text-red-800 transition duration-200"
  >
    <Icon size={20} />
  </motion.a>
);

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Subscribed with email:', email);
    setEmail('');
  };

  return (
    <footer className="bg-white text-black py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            <motion.h3 
              className="text-xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              MOODJOURNAL
            </motion.h3>
            <p className="text-gray-700 md:w-[280px]">Capture and express your emotions through beautiful images.</p>
          </div>
          <div className='grid grid-cols-2 gap-10'>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.name}>
                    <FooterLink item={link} />
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <FooterLink item={link} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-700 mb-2">Stay updated with our latest features and images</p>
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                className="bg-gray-800 text-white p-2 rounded flex-grow" 
              />
              <motion.button 
                type="submit" 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-900">&copy; 2024 MOODJOURNAL. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {socialLinks.map((link, index) => (
              <SocialLink key={index} Icon={link.icon} url={link.url} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;