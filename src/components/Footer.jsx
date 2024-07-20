import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Subscribed with email:', email);
    setEmail('');
  };

  return (
    <footer className="bg-white text-black pt-8 w-full h-auto flex flex-col">

      {/* Contact Section */}
      <div className="container mx-auto px-4 pt-2 w-full h-auto pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-4xl font-semibold mb-4">Say Hello</h2>
            <div className="mb-2 mt-12 md:mt-48">
              <h3 className="font-semibold">Stay updated on news</h3>
              <form onSubmit={handleSubmit} className="flex mt-2 border-2 border-zinc-400 rounded-full overflow-hidden bg-white">
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
            <p className="text-xs">&copy; MOODJOURNAL 2024. All rights reserved</p>
          </div>
          <div className="md:ml-16">
            <h3 className="font-bold mb-2">New business</h3>
            <p>viki@moodjournal.com</p>
            <h3 className="font-bold mt-4 mb-2">Join us</h3>
            <p>hello@moodjournal.com</p>
            <h3 className="font-bold mt-4 mb-2">Follow us</h3>
            <ul>
              <li><a href="#" className="hover:underline">LinkedIn</a></li>
              <li><a href="#" className="hover:underline">Instagram</a></li>
              <li><a href="#" className="hover:underline">Twitter</a></li>
            </ul>
            <h3 className="font-semibold mt-4 mb-2">Legal</h3>
            <ul>
              <li><Link to="/cookies" className="hover:underline">Cookie Policy</Link></li>
              <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Contact</h3>
            <p>Studio 402</p>
            <p>Makateb Building Two</p>
            <p>Production City, Dubai</p>
            <p className="mt-2">+971 (0)4 420 7025</p>
            <a href="#" className="underline mt-2 inline-block mb-2">See on Map</a>
          </div>
        </div>
      </div>

      {/* bottom footer */}
      <div className="bg-[#F8D347] pt-12 w-full h-auto overflow-hidden">
        <div className=" mx-auto px-4 flex items-center justify-center overflow-hidden">
          <h1 className="text-[70px] md:text-[16rem] lg:text-[17rem] md:leading-[210px] mt-4 tracking-tighter lg:tracking-[-0.07em] font-bold">MoodJournal</h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;