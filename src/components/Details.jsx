import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Heart, Download, Share, User, Calendar, MapPin, Edit } from 'lucide-react';

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
  };

  const handleEdit = () => {
    // Placeholder for edit functionality
    console.log('Edit functionality to be implemented');
    alert('Edit functionality coming soon!');
  };

  const renderBackLink = () => {
    if (navState && navState.from === 'collection') {
      return (
        <Link 
          to={`/collections/${navState.collectionId}`}
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
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;
  }

  if (!image) {
    return <div className="flex items-center justify-center h-screen">No image found</div>;
  }

  return (
    <div className="container mx-auto p-4 py-24 max-w-7xl">
      {renderBackLink()}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-2/3 p-4 relative">
            <img
              src={image.urls.regular}
              alt={image.alt_description}
              className="w-full h-auto object-contain rounded-lg cursor-pointer"
              style={{ maxHeight: isFullscreen ? '100vh' : '70vh' }}
              onClick={toggleFullscreen}
            />
            {isFullscreen && (
              <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={toggleFullscreen}>
                <img
                  src={image.urls.full}
                  alt={image.alt_description}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            )}
          </div>
          <div className="md:w-1/3 p-6">
            <h2 className="text-2xl font-bold mb-4">{image.description || 'Untitled'}</h2>
            <div className="mb-4 flex items-center">
              <User className="mr-2 text-gray-500" size={18} />
              <p className="text-gray-700">By {image.user.name}</p>
            </div>
            {image.created_at && (
              <div className="mb-4 flex items-center">
                <Calendar className="mr-2 text-gray-500" size={18} />
                <p className="text-gray-700">{new Date(image.created_at).toLocaleDateString()}</p>
              </div>
            )}
            {image.location.name && (
              <div className="mb-4 flex items-center">
                <MapPin className="mr-2 text-gray-500" size={18} />
                <p className="text-gray-700">{image.location.name}</p>
              </div>
            )}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {image.tags.slice(0, 5).map((tag, index) => (
                  <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
                    {tag.title}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleLike}
                className={`${
                  liked ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                } text-white px-4 py-2 rounded-full flex items-center justify-center transition-colors`}
              >
                <Heart className={`mr-2 ${liked ? 'fill-current' : ''}`} size={18} /> 
                {liked ? 'Liked' : 'Like'} ({likeCount})
              </button>
              <button
                onClick={handleShare}
                className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 flex items-center justify-center transition-colors"
              >
                <Share className="mr-2" size={18} /> Share
              </button>
              <button
                onClick={handleDownload}
                className="bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-600 flex items-center justify-center transition-colors"
              >
                <Download className="mr-2" size={18} /> Download
              </button>
              <button
                onClick={handleEdit}
                className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 flex items-center justify-center transition-colors"
              >
                <Edit className="mr-2" size={18} /> Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;