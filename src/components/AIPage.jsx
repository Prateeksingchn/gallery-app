import React, { useState, useCallback } from 'react';

const CustomAlert = ({ message }) => (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
    <strong className="font-bold">Error!</strong>
    <span className="block sm:inline"> {message}</span>
  </div>
);

const AIImageGeneration = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateImage = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer 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" // Replace with your actual API key
          },
          body: JSON.stringify({ inputs: prompt }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to generate image');
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setGeneratedImage(imageUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [prompt]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-purple-800 mb-4">AI Image Generation</h2>
      <textarea
        className="w-full p-2 border rounded"
        rows="4"
        placeholder="Enter your image description..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
        onClick={generateImage}
        disabled={loading || !prompt.trim()}
      >
        {loading ? 'Generating...' : 'Generate Image'}
      </button>
      
      {error && <CustomAlert message={error} />}
      
      <div className="mt-6 w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
        {generatedImage ? (
          <img src={generatedImage} alt="Generated" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            Your generated image will appear here
          </div>
        )}
      </div>
      
      {generatedImage && (
        <div className="mt-4 flex space-x-2">
          <a 
            href={generatedImage} 
            download="generated-image.png"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Save
          </a>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
            Share
          </button>
        </div>
      )}
    </div>
  );
};

const AIImageGenerationSection = () => {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-purple-800 mb-4">How to Use AI Image Generation</h2>
      <ol className="list-decimal list-inside space-y-2">
        <li>Enter a detailed description of the image you want to generate in the text box.</li>
        <li>Click the "Generate Image" button to create your image.</li>
        <li>Wait for the AI to process your request (this may take a few seconds).</li>
        <li>Once generated, your image will appear in the display area.</li>
        <li>Use the "Save" button to download the image or "Share" to share it on social media.</li>
      </ol>
      <p className="mt-4">
        Tips for best results:
      </p>
      <ul className="list-disc list-inside space-y-2">
        <li>Be as specific as possible in your description.</li>
        <li>Include details about style, colors, and composition.</li>
        <li>Experiment with different phrasings to see how they affect the output.</li>
      </ul>
    </div>
  );
};

const AIPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 to-pink-400 py-12 px-4">
      <h1 className="text-4xl font-bold text-white text-center mb-8">AI Image Gallery</h1>
      <AIImageGeneration />
      <AIImageGenerationSection />
    </div>
  );
};

export default AIPage;