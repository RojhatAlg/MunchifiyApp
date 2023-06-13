import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import '../../App2.css';
import Modal from 'react-modal';
import Navigation from '../../components2/Navigation'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import PersonIcon from '@mui/icons-material/AccountCircleOutlined';
import EditProfile from '../../components2/EditProfile'
import sceneryImage from '../../assets/scenery.jpg';
import sceneryImage2 from '../../assets/scenery2.jpg';
import sceneryImage3 from '../../assets/scenery3.jpg';
import sceneryImage4 from '../../assets/scenery4.jpg';
import sceneryImage5 from '../../assets/scenery4.jpg';
import { useNavigate } from 'react-router-dom';


Modal.setAppElement('#root');

const SearchPage = () => {
  const navigate = useNavigate()
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const [likesData, setLikesData] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  const nameOfMuseum = "Munchify"
  const [data, setData] = useState([
    {
      id: 1,
      profileName: 'Knight rider',
      profilePicture: <PersonIcon style={{ fontSize: 48 }} />,
      imgSrc: sceneryImage3,
      likes: 0,
      comments: 0,
    },
    {
      id: 2,
      profileName: 'Day walker',
      profilePicture: <PersonIcon style={{ fontSize: 48 }} />,
      imgSrc: sceneryImage2,
      likes: 0,
      comments: 0,
    },
    {
      id: 3,
      profileName: 'Day walker',
      profilePicture: <PersonIcon style={{ fontSize: 48 }} />,
      imgSrc: sceneryImage,
      likes: 0,
      comments: 0,
    },
    {
      id: 4,
      profileName: 'Day walker',
      profilePicture: <PersonIcon style={{ fontSize: 48 }} />,
      imgSrc: sceneryImage4,
      likes: 0,
      comments: 0,
    },
    {
      id: 5,
      profileName: 'Knight rider',
      profilePicture: <PersonIcon style={{ fontSize: 48 }} />,
      imgSrc: sceneryImage5,
      likes: 0,
      comments: 0,
    },
  ]);

  useEffect(() => {
    fetchLikesData();
  }, []);

  const fetchLikesData = () => {
    fetch('/api/likes')
      .then((response) => response.json())
      .then((data) => {
        console.log('Likes Data:', data);
        setLikesData(data);
        updateLikesCount(data);
      })
      .catch((error) => {
        console.error('Error fetching likes:', error);
      });
  };

  const updateLikesCount = (likesData) => {
    const updatedData = data.map((item) => {
      const likesCount = likesData.filter((like) => like.postId === item.id).length;
      return { ...item, likes: likesCount };
    });
    setData(updatedData);
  };

  const handleOpenCommentsModal = (postId) => {
    setIsCommentsVisible(postId);
  };

  const handleCloseCommentsModal = () => {
    setIsCommentsVisible(false);
  };

  const handleLikeToggle = (postId) => {
    setLikedPosts((prevLikedPosts) => {
      if (prevLikedPosts.includes(postId)) {
        return prevLikedPosts.filter((id) => id !== postId);
      } else {
        return [...prevLikedPosts, postId];
      }
    });

    setLikesData((prevData) => {
      return prevData.map((item) => {
        if (item.id === postId) {
          const liked = likedPosts.includes(postId);
          const likesCount = liked ? item.likes - 1 : item.likes + 1;
          const updatedItem = { ...item, likes: likesCount };
          return updatedItem;
        }
        return item;
      });
    });
  };

  const handleCommentSubmit = (e, postId) => {
    e.preventDefault();
    console.log('New Comment:', newComment);
  
    setData((prevData) => {
      return prevData.map((item) => {
        if (item.id === postId) {
          const updatedItem = { ...item, comments: item.comments + 1 };
          return updatedItem;
        }
        return item;
      });
    });
  
    setComments((prevComments) => [
      ...prevComments,
      { postId: postId, username: 'Your Name', text: newComment },
    ]);
  
    setNewComment('');
  };

  function handleNavigation(){
    navigate("/follower");
  }
  

  const inputStyles = {
    marginRight: '10px',
    padding: '5px',
    width: '200px',
  };

  const commentStyles = {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
  };

  const profilePicStyles = {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    marginRight: '10px',
  };

  const usernameStyles = {
    fontWeight: 'bold',
    marginRight: '5px',
  };



  const searchContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
  };

  const searchInputStyles = {
    marginRight: '10px',
    padding: '5px',
    width: '200px',
  };

  return (
    <div>
      <h1 className="nameOfMuseum">{nameOfMuseum}</h1>
      <EditProfile />

     

      {data.map((item) => {
        const liked = likedPosts.includes(item.id);
        const initialLikes = liked ? item.likes + likedPosts.filter((id) => id === item.id).length : item.likes;

        return (
          <div key={item.id} style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '5px' }}>
            {item.profilePicture}
        <button onClick={handleNavigation} className="titleForPosts">
          <h3>{item.profileName}</h3>
        </button>
            </div>
            <div style={{ width: 'auto', height: '250px', padding: '10px' }}>
              <img src={item.imgSrc} alt="Card" style={{ width: '100%', height: '100%' }} />
            </div>
            <div
              style={{ display: 'inline-block', cursor: 'pointer', marginLeft: '10px' }}
              onClick={() => handleLikeToggle(item.id)}
            >
              <ThumbUpIcon color={liked ? 'primary' : 'inherit'} />
              <span style={{ marginLeft: '3px' }}>{initialLikes}</span>
            </div>
            <div
              style={{ display: 'inline-block', cursor: 'pointer', marginLeft: '10px' }}
              onClick={() => handleOpenCommentsModal(item.id)}
            >
              <CommentIcon />
              <span style={{ marginLeft: '3px' }}>{item.comments}</span>
            </div>
          </div>
        );
      })}

      {/* Comments Modal */}
      <ReactModal
        isOpen={Boolean(isCommentsVisible)}
        onRequestClose={handleCloseCommentsModal}
        contentLabel="Comments Modal"
      >
        <h2>Comments</h2>
        {comments.map((comment, index) => (
          <div key={index} style={commentStyles}>
            <img src={sceneryImage} alt="Profile" style={profilePicStyles} />
            <span style={usernameStyles}>{comment.username}:</span>
            <span>{comment.text}</span>
          </div>
        ))}
        <form onSubmit={(e) => handleCommentSubmit(e, isCommentsVisible)}>
          <input
            type="text"
            style={inputStyles}
            placeholder="Add a comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </ReactModal>
      <Navigation />
    </div>
  );
};

export default SearchPage;
