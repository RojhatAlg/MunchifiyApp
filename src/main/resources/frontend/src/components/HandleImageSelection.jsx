import React, { useState } from 'react';

function ImageSelection({ onImageUpload }) {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to an array

    const imagePreviews = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePreviews)
      .then((results) => {
        setSelectedImages((prevImages) => [...prevImages, ...results]);
        onImageUpload(files); // Pass the selected files back to the parent component
      })
      .catch((error) => {
        console.log('Error reading image:', error);
      });
  };

  return (
    <div>
      <h2>Image Selection</h2>
      <input type="file" multiple onChange={handleImageUpload} />
      {selectedImages.length > 0 && (
        <div className="image-preview">
          {selectedImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index}`}
              style={{ width: '300px', height: '200px', objectFit: 'cover', margin: '10px' }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageSelection;
