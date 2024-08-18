/* App.jsx */
/* ---------------- */

import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [resizedImage, setResizedImage] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setImageUrl('');
    setError('');
  };

  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
    setFile(null);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file && !imageUrl) {
      setError('Please provide an image file or URL');
      return;
    }
    if (!width || !height) {
      setError('Please provide both width and height');
      return;
    }

    const formData = new FormData();
    if (file) {
      formData.append('image', file);
    } else {
      formData.append('imageUrl', imageUrl);
    }

    try {
      const response = await axios.post(`http://localhost:3000/resize?width=${width}&height=${height}`, formData, {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const blob = new Blob([response.data], { type: 'image/jpeg' });
      setResizedImage(URL.createObjectURL(blob));
      setError('');
    } catch (error) {
      console.error('Error resizing image:', error);
      setError('Error resizing image. Please try again.');
    }
  };

  return (
    <>
    <div className="App">
      <h1>Image Resizer</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="file">Upload Image:</label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
        <div>
          <label htmlFor="url">Or Provide Image URL:</label>
          <input
            type="text"
            id="url"
            value={imageUrl}
            onChange={handleUrlChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>
        <div>
          <label htmlFor="width">Width:</label>
          <input
            type="number"
            id="width"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            placeholder="Width in pixels"
          />
        </div>
        <div>
          <label htmlFor="height">Height:</label>
          <input
            type="number"
            id="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Height in pixels"
          />
        </div>
        <button type="submit">Resize</button>
      </form>
      {error && <p className="error">{error}</p>}
      {resizedImage && (
        <div>
          <h2>Resized Image:</h2>
          <img src={resizedImage} alt="Resized" />
        </div>
      )}
    </div>
    </>
  );

}

export default App;