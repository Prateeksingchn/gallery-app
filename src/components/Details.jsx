import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Download, Share, User, Calendar, MapPin } from 'lucide-react';

const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;

const Details = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

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
        setLikeCount(data.likes);
      } catch (error) {
        console.error('Error fetching image details:', error);
        setError('Failed to fetch image details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchImageDetails();
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id]);

  const handleLike = () => {
    if (liked) {
      setLikeCount((prevCount) => prevCount - 1);
    } else {
      setLikeCount((prevCount) => prevCount + 1);
    }
    setLiked(!liked);
    console.log(`Image ${id} ${liked ? 'unliked' : 'liked'}`);
    alert(`Image ${liked ? 'unliked' : 'liked'}!`);
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
      const textarea = document.createElement('textarea');
      textarea.value = shareUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      alert('Link copied to clipboard! You can now share it manually.');
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
      <Link 
        to="/gallery" 
        state={{ scrollToGrid: true }}
        className="inline-flex items-center mb-6 text-blue-600 hover:text-blue-800 transition-colors"
      >
        <ArrowLeft className="mr-2" /> Back to Gallery
      </Link>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-2/3 p-4">
            <img
              src={image.urls.regular}
              alt={image.alt_description}
              className="w-full h-auto object-contain rounded-lg "
              style={{ maxHeight: '70vh' }}
            />
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

            {/* Like, Share and Download buttons */}
            <div className="flex flex-col  gap-3">
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
              <a
                href={image.links.download}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-600 flex items-center justify-center transition-colors"
              >
                <Download className="mr-2" size={18} /> Download
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;