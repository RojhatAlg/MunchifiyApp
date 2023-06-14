import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import '../App.css';
import Modal from 'react-modal';
import Navigation from '../components/Navigation';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import PersonIcon from '@mui/icons-material/AccountCircleOutlined';
import EditProfile from '../components/EditProfile';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');

const SearchPage = () => {
  const navigate = useNavigate();
  const navigate = useNavigate();
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const [likedPosts, setLikedPosts] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  const nameOfMuseum = "Munchify";
  const [data, setData] = useState([]);
  const nameOfMuseum = "Munchify";
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchLikesData();
    getAllPost();
  }, []);

  const fetchPosts = () => {
    fetch('/api/post')
        .then((response) => response.json())
        .then((postData) => {
          console.log('Posts Data:', postData);
          const postIds = postData.map((post) => post.id);
          fetch('/api/signup')
              .then((response) => response.json())
              .then((userData) => {
                console.log('Users Data:', userData);
                const combinedData = postData.map((post) => {
                  const user = userData.find((user) => user.id === post.userId);
                  return { ...post, user };
                });
                setData(combinedData);
                // Fetch comments for each post
                fetch('/api/comments')
                    .then((response) => response.json())
                    .then((commentsData) => {
                      console.log('Comments Data:', commentsData);
                      const combinedDataWithComments = combinedData.map((post) => {
                        const postComments = commentsData.filter((comment) => comment.postId === post.id);
                        return { ...post, comments: postComments };
                      });
                      setData(combinedDataWithComments);
                    })
                    .catch((error) => {
                      console.error('Error fetching comments:', error);
                    });
              })
              .catch((error) => {
                console.error('Error fetching users:', error);
              });
        })
        .catch((error) => {
          console.error('Error fetching posts:', error);
        });
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

  return (
    <div>

      <div className="search-page">
        <div className="search-header">
          <h2 className='nameOfMuseum'>{nameOfMuseum}</h2>
        </div>
        <EditProfile />

        <div className="search-body">
          {data.map((item) => (
            <div key={item.id} className="post">
              <div className="post-header">
               
                <p style={{ display: 'flex', alignItems: 'center', marginLeft: '4%' }}>{item.bio}</p>
                <div className="post-image">
                <img src={item.photo} alt="Post" style={{ width: '90%', height: '250px', padding: '4%' }} />
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
