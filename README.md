# Image Gallery

## Description

Image Gallery is a React-based web application that showcases a collection of high-quality images using the Unsplash API. It features a responsive layout with a bento grid style, image lazy loading, and infinite scrolling.

## Features

- Dynamic image loading from Unsplash API
- Responsive bento grid layout
- Lazy loading of images for improved performance
- Infinite scrolling to load more images
- Animated image cards using Framer Motion
- Responsive design for various screen sizes

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- An Unsplash API key

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Prateeksingchn/gallery-app
   cd image-gallery
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your Unsplash API key:
   ```
   VITE_UNSPLASH_API_KEY=your_unsplash_api_key_here
   ```

## Usage

To start the development server:

```
npm run dev
```

This will start the application on `http://localhost:3000` (or another port if 3000 is already in use).

To build the application for production:

```
npm run build
```

## Project Structure

```
image-gallery/
├── src/
│   ├── components/
│   │   └── Home.jsx
│   ├── App.jsx
│   └── main.jsx
├── public/
├── .env
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## Contributing

Contributions to the Image Gallery project are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contact

Your Name - prateeksinghchouhan007@gmail.com

Project Link: [https://github.com/your-username/image-gallery](https://github.com/your-username/image-gallery)

## Acknowledgements

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Unsplash API](https://unsplash.com/developers)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/)