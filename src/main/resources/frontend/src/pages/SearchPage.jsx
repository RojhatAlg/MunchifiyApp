import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import '../App.css';
import '../css/searchPage.css';
import Modal from 'react-modal';
import Navigation from '../components/Navigation'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import EditProfile from '../components/EditProfile'
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';


Modal.setAppElement('#root');

const SearchPage = () => {
    const navigate = useNavigate();
    const [isCommentsVisible, setIsCommentsVisible] = useState(false);
    const [likedPosts, setLikedPosts] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);

    const nameOfMuseum = "Munchify";
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchPosts();
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
        console.log('New Comment:', newComment);

        const commentUsername = 'username'; // Replace 'YourName' with the actual username

        // Fetch the user's profile picture based on their username
        fetch(`/api/signup?username=${commentUsername}`)
            .then((response) => response.json())
            .then((userData) => {
                const profilePic = userData.photo; // Assuming the user's profile picture is stored in the 'photo' field
                setComments((prevComments) => [
                    ...prevComments,
                    { postId: postId, userName: 'Your Name', text: newComment, profilePic: profilePic },

                    console.log("Profile pic: " + profilePic)
                ]);
                setNewComment('');
            })
            .catch((error) => {
                console.error('Error fetching user:', error);
            });
    };
function handleSearch(){
  console.log("Searchin...")
}


    const handleNavigation = () => {
        navigate('/exhibit');
    };

    const profilePicStyles = {
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        marginRight: '10px',
    };

    const commentStyles = {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
    };

    const usernameStyles = {
        fontWeight: 'bold',
        marginRight: '5px',
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
            <h1 className="nameOfMuseum">{nameOfMuseum}</h1>
            <EditProfile />
              {/* Search Box */}
      <div style={searchContainerStyles}>
        <input
          type="text"
          style={searchInputStyles}
          placeholder="Search"
         
          
        />
        <button onClick={handleSearch}>
          <SearchIcon />
        </button>
      </div>

            {data.map((item) => {
                const liked = likedPosts.includes(item.id);
                const initialLikes = liked
                    ? item.likes + likedPosts.filter((id) => id === item.id).length
                    : item.likes;

                // Find the user object from the data array
                const user = item.user;
                const profilePic = user && user.photo;

                return (
                    <div key={item.id} style={{ marginBottom: '6%', marginTop: '-4%%' }}>
                        <button onClick={handleNavigation} className="buttonbutton" style={{marginLeft:'5%'}}>
                            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '5%' }}>
                                {profilePic && <img src={profilePic} alt="Profile" style={profilePicStyles} />}
                                <div>
                                    <h3>{item.profileName}</h3>
                                    <span>{user && user.username}</span>
                                </div>
                            </div>
                        </button>

                        <div style={{ width: 'auto', height: '250px', padding: '10px' }}>
                            <img src={item.photo} alt="Card" className='pictureSettings' />
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
                {data.map((item) => {
                    if (item.id === isCommentsVisible && item.comments) {
                        return item.comments.map((comment, index) => (
                            <div key={index} style={commentStyles}>
                                <img src={comment.profilePic} alt="Profile" style={profilePicStyles} />
                                <span style={usernameStyles}>{comment.username}:</span>
                                <span>{comment.text}</span>
                            </div>
                        ));
                    }
                    return null;
                })}
                <form onSubmit={(e) => handleCommentSubmit(e, isCommentsVisible)}>
                    <input
                        type="text"
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
