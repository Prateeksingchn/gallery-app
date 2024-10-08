import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Heart, Download, Share, User, Calendar, MapPin, Edit, X, ZoomIn, ZoomOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;

const Details = () => {
  const { id } = useParams();
  const location = useLocation();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [navState, setNavState] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (location.state) {
      setNavState(location.state);
      localStorage.setItem('detailsNavState', JSON.stringify(location.state));
    } else {
      const storedState = localStorage.getItem('detailsNavState');
      if (storedState) {
        setNavState(JSON.parse(storedState));
      }
    }

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
        setLikeCount(data.likes);
      } catch (error) {
        console.error('Error fetching image details:', error);
        setError('Failed to fetch image details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchImageDetails();
    window.scrollTo(0, 0);

    return () => {
      localStorage.removeItem('detailsNavState');
    };
  }, [id, location.state]);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((prevCount) => liked ? prevCount - 1 : prevCount + 1);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: image.description || 'Shared Image',
        text: `Check out this image by ${image.user.name} on Unsplash!`,
        url: image.links.html,
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
    } else {
      const shareUrl = image.links.html;
      navigator.clipboard.writeText(shareUrl)
        .then(() => alert('Link copied to clipboard! You can now share it manually.'))
        .catch(err => console.error('Failed to copy: ', err));
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image.urls.full;
    link.download = `${image.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    setZoom(1);
  };

  const handleZoomIn = () => {
    setZoom(prevZoom => Math.min(prevZoom + 0.1, 3));
  };

  const handleZoomOut = () => {
    setZoom(prevZoom => Math.max(prevZoom - 0.1, 0.5));
  };

  const renderBackLink = () => {
    if (navState && navState.from === 'collection') {
      return (
        <Link 
          to={`/collections`}
          className="inline-flex items-center mb-6 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="mr-2" /> Back to {navState.collectionTitle || 'Collection'}
        </Link>
      );
    } else {
      return (
        <Link 
          to="/gallery"
          state={{ scrollToGrid: true }}
          className="inline-flex items-center mb-6 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="mr-2" /> Back to Gallery
        </Link>
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen bg-gray-100 text-red-500">{error}</div>;
  }

  if (!image) {
    return <div className="flex items-center justify-center h-screen bg-gray-100 text-gray-800">No image found</div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-100 text-gray-800 py-20"
    >
      <div className="container mx-auto px-4 py-8">
        {renderBackLink()}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-2/3 p-4 relative">
              <motion.img
                src={image.urls.regular}
                alt={image.alt_description}
                className="w-full h-auto object-contain rounded-lg cursor-pointer"
                style={{ maxHeight: '70vh' }}
                onClick={toggleFullscreen}
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              />
              <motion.button
                className="absolute top-6 right-6 bg-gray-200 bg-opacity-50 p-2 rounded-full"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleFullscreen}
              >
                <ZoomIn className="text-gray-800" size={24} />
              </motion.button>
            </div>
            <div className="md:w-1/3 p-8 bg-gray-50">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">{image.description || 'Untitled'}</h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <User className="mr-3 text-blue-600" size={20} />
                  <p className="text-gray-700 font-medium">{image.user.name}</p>
                </div>
                {image.created_at && (
                  <div className="flex items-center">
                    <Calendar className="mr-3 text-blue-600" size={20} />
                    <p className="text-gray-700">{new Date(image.created_at).toLocaleDateString()}</p>
                  </div>
                )}
                {image.location.name && (
                  <div className="flex items-center">
                    <MapPin className="mr-3 text-blue-600" size={20} />
                    <p className="text-gray-700">{image.location.name}</p>
                  </div>
                )}
              </div>
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {image.tags.slice(0, 5).map((tag, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {tag.title}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLike}
                  className={`${
                    liked ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                  } text-white px-4 py-3 rounded-lg flex items-center justify-center transition-colors`}
                >
                  <Heart className={`mr-2 ${liked ? 'fill-current' : ''}`} size={18} /> 
                  {liked ? 'Liked' : 'Like'} ({likeCount})
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShare}
                  className="bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 flex items-center justify-center transition-colors"
                >
                  <Share className="mr-2" size={18} /> Share
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownload}
                  className="bg-purple-500 text-white px-4 py-3 rounded-lg hover:bg-purple-600 flex items-center justify-center transition-colors"
                >
                  <Download className="mr-2" size={18} /> Download
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => alert('Edit functionality coming soon!')}
                  className="bg-yellow-500 text-white px-4 py-3 rounded-lg hover:bg-yellow-600 flex items-center justify-center transition-colors"
                >
                  <Edit className="mr-2" size={18} /> Edit
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isFullscreen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
            onClick={toggleFullscreen}
          >
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: zoom }}
              src={image.urls.full}
              alt={image.alt_description}
              className="max-w-full max-h-full object-contain"
              style={{ transform: `scale(${zoom})` }}
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); handleZoomOut(); }}
                className="bg-white bg-opacity-20 p-2 rounded-full"
              >
                <ZoomOut className="text-white" size={24} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); handleZoomIn(); }}
                className="bg-white bg-opacity-20 p-2 rounded-full"
              >
                <ZoomIn className="text-white" size={24} />
              </motion.button>
            </div>
            <button 
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
              onClick={toggleFullscreen}
            >
              <X size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Details;