import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';

//import { fetchFavoritesData } from './api.js';
import Modal from 'react-modal';
import Navigation from '../components/Navigation';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import PersonIcon from '@mui/icons-material/AccountCircleOutlined';
import sceneryImage from '../assets/scenery.jpg';
import sceneryImage2 from '../assets/scenery2.jpg';
import sceneryImage3 from '../assets/scenery3.jpg';
import sceneryImage4 from '../assets/scenery4.jpg';
import sceneryImage5 from '../assets/scenery5.jpg';
import sceneryImage6 from '../assets/scenery6.jpg';
import sceneryImage7 from '../assets/scenery7.jpg';
import EditProfile from '../components/EditProfile'

Modal.setAppElement('#root');

function HelloWorld() {
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const [commentsData, setCommentsData] = useState([]);

  // Title
  const nameOfMuseum = "Munchify";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    // Simulating API call delay for comments data
    setTimeout(() => {
      const commentsData = ['Comment 1', 'Comment 2', 'Comment 3'];
      setCommentsData(commentsData);
    }, 3000);
  };

  

  const data = [
    {
      id: 1,
      profileName: "Knight rider",
      profilePicture: <PersonIcon style={{ fontSize: 48 }}/>,
      imgSrc: sceneryImage,
      likes: 10,
      comments: 2

    },
    {
      id: 2,
      profileName: "Greger",
      profilePicture: <PersonIcon style={{ fontSize: 48 }}/>,
      imgSrc: sceneryImage2,
      likes: 20,
      comments: 2
    },
    {
      id: 3,
      profileName: "Day walker",
      profilePicture: <PersonIcon style={{ fontSize: 48 }}/>,
      imgSrc: sceneryImage3,
      likes: 19,
      comments: 2
    },
    {
      id: 4,
      profileName: "Day walker",
      profilePicture: <PersonIcon style={{ fontSize: 48 }}/>,
      imgSrc: sceneryImage4,
      likes: 100,
      comments: 2
    },
    {
      id: 5,
      profileName: "Knight rider",
      profilePicture: <PersonIcon style={{ fontSize: 48 }}/>,
      imgSrc: sceneryImage5,
      likes: 16,
      comments: 2
    },
    {
      id: 6,
      profileName: "Day walker",
      profilePicture: <PersonIcon style={{ fontSize: 48 }}/>,
      imgSrc: sceneryImage6,
      likes: 30,
      comments: 2
    },
    {
      id: 7,
      profileName: "Day walker",
      profilePicture: <PersonIcon style={{ fontSize: 48 }}/>,
      imgSrc: sceneryImage7,
      likes: 19,
      comments: 2
    },
    {
      id: 8,
      profileName: "Knight rider",
      profilePicture: <PersonIcon style={{ fontSize: 48 }}/>,
      imgSrc: sceneryImage3,
      likes: 76,
      comments: 2
    },
    {
      id: 9,
      profileName: "Knight rider",
      profilePicture: <PersonIcon style={{ fontSize: 48 }}/>,
      imgSrc: sceneryImage6,
      likes: 19,
      comments: 2
    },
    {
      id: 10,
      profileName: "Day walker",
      profilePicture: <PersonIcon style={{ fontSize: 48 }}/>,
      imgSrc: sceneryImage2,
      likes: 86,
      comments: 2
    }
  ];
  const handleOpenCommentsModal = () => {
    setIsCommentsVisible(true);
  };

  const handleCloseCommentsModal = () => {
    setIsCommentsVisible(false);
  };

  return (
    <div>
       
      <h1 className="nameOfMuseum">{nameOfMuseum}</h1>
      <EditProfile />
      {data.map(item => (
        <div key={item.id} style={{ marginBottom: '40px'}}>
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '5px'}}>
            {item.profilePicture}
            <h3 className="titleForPosts">{item.profileName}</h3>
          </div>
          <div style={{ width: 'auto', height: '250px', padding: '10px' }}>
            <img src={item.imgSrc} alt="Card" style={{ width: '100%', height: '100%' }} />
          </div>
          <div style={{ display: 'inline-block', cursor: 'pointer', marginLeft: '10px' }}>
            <ThumbUpIcon fontSize="large" style={{ marginRight: '5px' }} />
            <span>{item.likes}</span>
          </div>
          <div style={{ display: 'inline-block', cursor: 'pointer', marginLeft: '10px' }}>
            <CommentIcon fontSize="large" style={{ marginRight: '5px' }} onClick={handleOpenCommentsModal} />
            <span>{item.comments}</span>
          </div>
        </div>
      ))}

      {/* Comments Modal */}
      {isCommentsVisible && (
        <ReactModal isOpen={isCommentsVisible} onRequestClose={handleCloseCommentsModal}>
          <h2>Comments</h2>
          {commentsData.length > 0 ? (
            <ul>
              {commentsData.map((comment, index) => (
                <li key={index}>{comment}</li>
              ))}
            </ul>
          ) : (
            <p>No comments yet.</p>
          )}
        </ReactModal>
      )}

      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
}

export default HelloWorld;