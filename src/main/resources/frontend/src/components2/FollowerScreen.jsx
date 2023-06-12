import React, { useState } from 'react';
import '../App2.css';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import sceneryImage2 from '../assets/scenery2.jpg';
import sceneryImage3 from '../assets/scenery3.jpg';
import sceneryImage4 from '../assets/scenery4.jpg';
import sceneryImage5 from '../assets/scenery5.jpg';
import sceneryImage7 from '../assets/scenery7.jpg';
import backButton from '../assets/backButton.png';
import { useNavigate } from 'react-router-dom';

function MyProfilePage() {
  const navigate = useNavigate();
  const users = [
    {
      id: 1,
      name: "Knight rider",
      favorites: 5,
      likes: 7,
      profileImg: sceneryImage3
    },
    {
      id: 2,
      name: "Knight rider",
      favorites: 3,
      likes: 12,
      profileImg: sceneryImage2
    },
    {
      id: 3,
      name: "Knight rider",
      favorites: 3,
      likes: 12,
      profileImg: sceneryImage4
    },
    {
      id: 4,
      name: "Knight rider",
      favorites: 3,
      likes: 12,
      profileImg: sceneryImage5
    }
  ];

  // Title
  const nameOfMuseum = "Munchify";

  // username
  const userName = "Knight rider";

  const handleMyGallery = () => {
    console.log("A");
  };

  const handleMyFavorites = () => {
    console.log("B");
  };

  const handleOpenCommentsModal = () => {
    console.log("C");
  };

  function goToHomePage() {
    navigate("/home");
  }

  const [isFollowing, setIsFollowing] = useState(false);

  const toggleFollow = () => {
    setIsFollowing((prevState) => !prevState);
  };

  return (
    <div>
      <h1 className="nameOfMuseum">{nameOfMuseum}</h1>

      <button className="follower-back-button" onClick={goToHomePage}>
        <img src={backButton} alt="" />
      </button>

      <div className="user-profile">
        <h2 className="user-title">{userName}</h2>
        <img src={sceneryImage7} alt="" className="user-image" />
      </div>

      <p>
      <button
          className={isFollowing ? "follower-button following" : "follower-button"}
          onClick={toggleFollow}
        >
          {isFollowing ? "Following" : "Follow"}
        </button>
      </p>

      <div className="line"></div>

      <button onClick={handleMyGallery} className="gallery-button">
        Gallery
      </button>
      <button onClick={handleMyFavorites} className="favorites-button">
        Favorites
      </button>

      {users.map((item) => (
        <div key={item.id} style={{ marginBottom: '40px' }}>
          <div className="profile-image-container">
            <img src={item.profileImg} alt="" className="profile-image" />
          </div>
          <div className="icon-container">
            <ThumbUpIcon fontSize="large" className="icon" />
            <span>{item.likes}</span>
          </div>
          <div className="icon-container">
            <CommentIcon fontSize="large" className="icon" onClick={handleOpenCommentsModal} />
            <span>{item.favorites}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyProfilePage;
