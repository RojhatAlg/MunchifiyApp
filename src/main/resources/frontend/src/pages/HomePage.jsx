import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import '../App.css';
import '../css/homePage.css';
import Modal from 'react-modal';
import Navigation from '../components/Navigation';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import PersonIcon from '@mui/icons-material/AccountCircleOutlined';
import EditProfile from '../components/EditProfile';
import sceneryImage from '../assets/scenery.jpg';
import sceneryImage2 from '../assets/scenery2.jpg';
import sceneryImage3 from '../assets/scenery3.jpg';
import sceneryImage4 from '../assets/scenery4.jpg';
import sceneryImage5 from '../assets/scenery4.jpg';
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



    const handleNavigation = () => {
        navigate('/follower');
    };

    const profilePicStyles = {
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        marginLeft: '10px',
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

    const inputStyles = {
        marginBottom: '10px',
        padding: '5px',
        width: '100%',
    };

    return (
        <div>
            <h1 className="nameOfMuseum">{nameOfMuseum}</h1>
            <EditProfile />

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
                        <button onClick={handleNavigation} className='buttonbutton'>
                            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '7%', marginBottom:'14%' }}>
                                {profilePic && <img src={profilePic} alt="Profile" style={profilePicStyles} />}
                                <div>
                                    <h3>{item.profileName}</h3>
                                    <span>{user && user.username}</span>
                                </div>
                            </div>
                        </button>

                        <div >
                            <img src={item.photo} alt="Card" className='pictureSettings' />
                        </div>
                        <div
                            style={{ display: 'inline-block', cursor: 'pointer', marginLeft: '8%', marginTop: '4%' }}
                            onClick={() => handleLikeToggle(item.id)}
                        >
                            <ThumbUpIcon color={liked ? 'primary' : 'inherit'} style={{fontSize: '105%'}} />


                        </div>
                        <div
                            style={{ display: 'inline-block', cursor: 'pointer', marginLeft: '4%', marginTop: '2%' }}
                            onClick={() => handleOpenCommentsModal(item.id)}
                        >
                            <CommentIcon style={{fontSize:'110%'}}/>
                            <span >{item.comments && item.comments.length}</span>
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
