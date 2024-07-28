import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Download, Calendar, MapPin, Camera, User } from 'lucide-react';

const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;

const Details = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImageDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://api.unsplash.com/photos/${id}?client_id=${API_KEY}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setImage(data);
      } catch (error) {
        console.error('Error fetching image details:', error);
        setError('Failed to fetch image details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchImageDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center py-8 text-red-500 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!image) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center py-8 text-gray-700 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">No Image Found</h2>
          <p>The requested image could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-5">
      <div className="container mx-auto px-4">
        <Link to="/" className="inline-flex items-center mb-8 text-purple-600 hover:text-purple-800 transition-colors duration-300">
          <ArrowLeft size={20} className="mr-2" />
          Back to Gallery
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-xl overflow-hidden"
        >
          <div className="relative">
            <img
              src={image.urls.full}
              alt={image.alt_description}
              className="w-full h-[80vh] object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <h1 className="text-3xl font-bold text-white mb-2">{image.description || 'Untitled'}</h1>
              <p className="text-white text-opacity-80">Photo by {image.user.name}</p>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex items-center">
                <Heart size={24} className="text-red-500 mr-2" />
                <span className="text-lg">{image.likes} Likes</span>
              </div>
              <div className="flex items-center">
                <Download size={24} className="text-green-500 mr-2" />
                <span className="text-lg">{image.downloads} Downloads</span>
              </div>
              <div className="flex items-center">
                <Calendar size={24} className="text-blue-500 mr-2" />
                <span className="text-lg">Published on {new Date(image.created_at).toLocaleDateString()}</span>
              </div>
              {image.location.name && (
                <div className="flex items-center">
                  <MapPin size={24} className="text-yellow-500 mr-2" />
                  <span className="text-lg">{image.location.name}</span>
                </div>
              )}
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {image.tags.map((tag, index) => (
                  <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                    {tag.title}
                  </span>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">About the Photographer</h2>
              <div className="flex items-center">
                <img src={image.user.profile_image.medium} alt={image.user.name} className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h3 className="font-semibold">{image.user.name}</h3>
                  <a href={image.user.links.html} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">
                    View Profile
                  </a>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <a
                href={image.links.html}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-300"
              >
                <User size={20} className="mr-2" />
                View on Unsplash
              </a>
              <a
                href={image.links.download}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-300"
              >
                <Download size={20} className="mr-2" />
                Download
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Details;