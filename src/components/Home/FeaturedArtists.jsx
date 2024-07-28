import React from 'react';

const FeaturedArtists = ({ artists }) => {
  return (
    <section className="py-12 bg-[#ECE8E2] rounded-b-[50px]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Artists</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artists.map((artist, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <div className="relative">
                {artist.avatar && (
                  <img src={artist.avatar} alt={artist.name} className="w-full h-48 object-cover"/>
                )}
                <div className="absolute inset-0 bg-black opacity-25"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="text-xl font-semibold">{artist.name}</h3>
                  <p className="text-gray-300">{artist.specialty}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4">{artist.bio}</p>
                <a href={artist.portfolio} className="text-blue-500 hover:underline">
                  View Portfolio
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtists;
