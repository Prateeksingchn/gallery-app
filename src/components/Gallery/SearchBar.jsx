// src/pages/Gallery/SearchBar.jsx
import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({ query, setQuery, handleSearch }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <form onSubmit={handleSearch} className="flex w-[50%]">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for images..."
          className="flex-grow px-5 py-3 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-r-full hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-300 flex items-center"
        >
          <Search size={20} className="mr-2" />
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
