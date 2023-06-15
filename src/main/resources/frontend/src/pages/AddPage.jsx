import React, { useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Navigation from '../components/Navigation';
import EditProfile from '../components/EditProfile';

function AddPage() {
  const [imageUrl, setImageUrl] = useState('');

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handlePost = async () => {
    try {
      const postPayload = {
        bio: 'Your post bio', // Replace with the actual bio
        nrLikes: '0', // Replace with the actual number of likes
        nrFavourites: '0', // Replace with the actual number of favourites
        photo: imageUrl, // Use the entered image URL
      };

      await fetch('/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postPayload),
      });

      // Reset the image URL if needed
      setImageUrl('');
    } catch (error) {
      console.log('Error creating post:', error);
    }
  };

  return (
    <div>
      <h1 className="nameOfMuseum">Munchify</h1>
      <EditProfile />
      <div className="upload-button">
        <input
          type="text"
          value={imageUrl}
          onChange={handleImageUrlChange}
          placeholder="Paste image URL"
        />
        <AddCircleIcon fontSize="large" onClick={handlePost} />
      </div>
      <div className="image-preview">
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Image Preview"
            style={{ width: '100%', height: '250px', objectFit: 'cover', margin: '10px' }}
          />
        )}
      </div>
      {/* Rest of the code... */}
      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
}

export default AddPage;
