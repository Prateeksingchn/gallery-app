import React, { useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const ImageGrid = ({ images, loading, error, onExploreClick }) => {
  const gridRef = useRef(null);

  const getGridItemClass = (index) => {
    const classes = [
      "col-span-2 row-span-2", // Large square
      "col-span-1 row-span-1", // Small square
      "col-span-1 row-span-2", // Vertical rectangle
      "col-span-2 row-span-1", // Horizontal rectangle
    ];
    return classes[index % classes.length];
  };

  useEffect(() => {
    if (loading || error) return;

    const grid = gridRef.current;
    const columns = grid.querySelectorAll(".grid-column");

    const animateColumn = (column, speed) => {
      let position = 0;
      const animate = () => {
        position -= speed;
        column.style.transform = `translateY(${position}px)`;
        if (Math.abs(position) >= column.scrollHeight / 2) {
          position = 0;
        }
        requestAnimationFrame(animate);
      };
      animate();
    };

    columns.forEach((column, index) => {
      const speed = 0.5 + index * 0.2; // Varying speeds for each column
      animateColumn(column, speed);
    });
  }, [images, loading, error]);

  return (
    <div className="bg-black lg:min-h-screen min-h-[500px] relative">
      <div className="absolute top-10 left-10 z-10">
        <h2 className="text-4xl font-bold text-white">Save.</h2>
        <h2 className="text-4xl font-bold text-white">Share.</h2>
        <h2 className="text-4xl font-bold text-white">Inspire.</h2>
        <h2 className="text-4xl font-bold text-red-500">Join</h2>
      </div>

      {loading ? (
        <p className="text-center text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          Loading images...
        </p>
      ) : error ? (
        <p className="text-center text-red-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {error}
        </p>
      ) : (
        <div
          ref={gridRef}
          className="grid grid-cols-6 gap-2 overflow-hidden h-screen"
        >
          {[0, 1, 2, 3, 4, 5].map((colIndex) => (
            <div
              key={colIndex}
              className="col-span-1 grid grid-cols-1 gap-2 grid-column"
            >
              {images.map((image, index) => (
                <div
                  key={`${image.id}-${index}`}
                  className={`relative overflow-hidden rounded-lg ${getGridItemClass(
                    index
                  )}`}
                >
                  <img
                    src={image.urls.small}
                    alt={image.alt_description}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-1 bg-gradient-to-t from-black to-transparent">
                    <p className="text-white text-xs truncate">
                      {image.user.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      <Link to="/gallery">
        <button
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex items-center text-white hover:text-gray-300 transition-colors"
        >
          Explore Gallery
          <ChevronDown className="ml-2" />
        </button>
      </Link>
    </div>
  );
};

export default ImageGrid;
