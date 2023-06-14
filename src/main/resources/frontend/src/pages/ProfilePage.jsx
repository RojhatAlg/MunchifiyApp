import React, {useEffect} from 'react';
import '../App2.css';
import Navigation from '../components2/Navigation';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import sceneryImage2 from '../assets/scenery2.jpg';
import sceneryImage3 from '../assets/scenery3.jpg';
import sceneryImage4 from '../assets/scenery4.jpg';
import sceneryImage5 from '../assets/scenery5.jpg';
import sceneryImage7 from '../assets/scenery7.jpg';
import {useState} from "react";


function MyProfilePage() {

  const [userId, setUserId] = useState(0)


  useEffect(() => {
    async function fetchUserId(){
      const res = await fetch("http://localhost:8080/api/login")
      const data = await res.json();
      setUserId(data);
      console.log(data)
    }
    fetchUserId()
  }, [])
  const users = [
    {
      id: 1,
      name: "Day walker",
      favorites: 5,
      likes: 7,
      profileImg: sceneryImage2
    },
    {
      id: 2,
      name: "Knight rider",
      favorites: 3,
      likes: 12,
      profileImg: sceneryImage3
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




  console.log(userId)
  // Title
  const nameOfMuseum = "Munchify";

  //username
  const userName = "Day Walker";

  const handleMyGallery = () => {
    console.log("A");
  };

  const handleMyFavorites = () => {
    console.log("B");
  };

  const handleOpenCommentsModal = () => {
    console.log("C");
  };

  return (
    <div>
      <h1 className="nameOfMuseum">{nameOfMuseum}</h1>
      
      <div className="user-profile">
      <h2 className="user-title">{userName}</h2>
        <img src={sceneryImage7} alt="" className="user-image" />
      </div>

      <div className="line"></div>

      <button onClick={handleMyGallery} className="gallery-button">Gallery</button>
      <button onClick={handleMyFavorites} className="favorites-button">Favorites</button>
      {users.map(item => (
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
      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
}

export default MyProfilePage;
