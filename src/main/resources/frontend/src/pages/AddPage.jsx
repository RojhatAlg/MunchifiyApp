import React, { useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Navigation from '../components2/Navigation';
import EditProfile from '../components2/EditProfile';

//import ImageSelectionScreen from './components/ImageSelectionScreen';

function AddPage() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleImageUpload = (files) => {
    const imageFiles = Array.from(files); // Convert FileList to an array

    const imagePreviews = imageFiles.map((file) => {
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
      })
      .catch((error) => {
        console.log('Error reading image:', error);
      });
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h1 className="nameOfMuseum">Munchify</h1>
      <EditProfile />
      <div className="upload-button">
        <label htmlFor="image-upload" className="upload-label">
          <input
            id="image-upload"
            type="file"
            multiple
            onChange={(e) => handleImageUpload(e.target.files)}
            style={{ display: 'none' }}
          />
          <div className="upload-icon">
            <AddCircleIcon fontSize="large" onClick={handleOpenModal} />
          </div>
        </label>
      </div>
      {selectedImages.length > 0 && (
        <div className="image-preview">
          {selectedImages.map((image, index) => (
            <div>
            <img
              key={index}
              src={image}
              alt=''
              style={{ width: '100%', height: '250px', objectFit: 'cover', margin: '10px' }}
            />
            <button>Post</button>
            </div>
          ))}
        </div>
      )}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Hello</h2>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
}

export default AddPage;
