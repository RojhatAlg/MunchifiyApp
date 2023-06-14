import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import '../App.css';
import Modal from 'react-modal';
import Navigation from '../components/Navigation';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import EditProfile from '../components/EditProfile';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

Modal.setAppElement('#root');

const SearchPage = () => {
  const navigate = useNavigate();
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const [likesData, setLikesData] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const nameOfMuseum = "Munchify";
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchLikesData();
    getAllPost();
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

  const getAllPost = () => {
    fetch('/api/post')
      .then((response) => response.json())
      .then((postData) => {
        console.log('Post Data:', postData);
        const modifiedData = postData.map((item) => ({
          id: item.id,
          bio: item.bio,
          photo: item.photo,
          nrLikes: item.nrLikes,
          nrFavorites: item.nrFavorites,
          comments: item.comments,
        }));
        setData(modifiedData);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
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

    // Update comments in the state
    setComments((prevComments) => {
      const newCommentObj = {
        postId: postId,
        comment: newComment,
      };
      return [...prevComments, newCommentObj];
    });

    // Clear the comment input
    setNewComment('');
  };

  function handleNavigation() {
    navigate("/follower");
  }
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search Query:', searchQuery);
    // Perform search logic here
  };

  const searchContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '20%',
    marginRight: '20%'
  };

  const searchInputStyles = {
    marginRight: '10px',
    padding: '3%',
    width: '100%',
  };

  return (
    <div>

      <div className="search-page">
        <div className="search-header">
          <h2 className='nameOfMuseum'>{nameOfMuseum}</h2>
        </div>
        <EditProfile />

        {/* Search Box */}
      <div style={searchContainerStyles}>
        <input
          type="text"
          style={searchInputStyles}
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>
          <SearchIcon />
        </button>
      </div>

        <div className="search-body">
          {data.map((item) => (
            <div key={item.id} className="post">
              <div className="post-header">
               
                <p style={{ display: 'flex', alignItems: 'center', marginLeft: '4%' }}>{item.bio}</p>
                <div className="post-image">
                <img src={item.photo} alt="Post" style={{ width: '90%', height: '250px', marginLeft: '4%', marginRight: '4%' }} />
              </div>
                <div className="post-actions">
                  <div style={{ display: 'inline-block', cursor: 'pointer', marginLeft: '4%' }} onClick={() => handleLikeToggle(item.id)}>
                    <ThumbUpIcon />
                    <span>{item.nrLikes}</span>
                  </div>
                  <div style={{ display: 'inline-block', cursor: 'pointer', marginLeft: '4%' }} onClick={() => handleOpenCommentsModal(item.id)}>
                    <CommentIcon />
                    <span>{item.comments}16</span>
                  </div>
                </div>
              </div>

              

            
            </div>
          ))}
        </div>
      </div>

      <ReactModal
        isOpen={isCommentsVisible}
        onRequestClose={handleCloseCommentsModal}
        contentLabel="Comments Modal"
        className="modal"
      >
        <h2>Comments</h2>
        <button onClick={handleCloseCommentsModal}>Close</button>
      </ReactModal>
      <Navigation />
    </div>
  );
};

export default SearchPage;
