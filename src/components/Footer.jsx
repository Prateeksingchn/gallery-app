// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">ImageGallery App</h3>
            <p className="text-gray-400 md:w-[280px]">Discover and share beautiful images from around the world.</p>
          </div>
          <div className='grid grid-cols-2 gap-10'>
            <div className="">
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-gray-300 transition duration-200">Home</Link></li>
                <li><Link to="/gallery" className="hover:text-gray-300 transition duration-200">Gallery</Link></li>
                <li><Link to="/about" className="hover:text-gray-300 transition duration-200">About Us</Link></li>
                <li><a href="#" className="hover:text-gray-300 transition duration-200">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-gray-300 transition duration-200">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-gray-300 transition duration-200">Terms of Service</a></li>
                <li><a href="#" className="hover:text-gray-300 transition duration-200">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-2">Stay updated with our latest features and images</p>
            <form className="flex space-x-2">
              <input type="email" placeholder="Enter your email" className="bg-gray-800 text-white p-2 rounded flex-grow" />
              <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">&copy; 2024 ImageGallery App. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition duration-200">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-200">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-200">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-200">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;