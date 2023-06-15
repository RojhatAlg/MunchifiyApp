import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import '../App.css';
import Modal from 'react-modal';
import Navigation from '../components/Navigation'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import PersonIcon from '@mui/icons-material/AccountCircleOutlined';
import EditProfile from '../components/EditProfile'
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

        setComments((prevComments) => [
            ...prevComments,
            { postId: postId, username: 'Your Name', text: newComment, profilePic: sceneryImage },
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
                const initialLikes = liked
                    ? item.likes + likedPosts.filter((id) => id === item.id).length
                    : item.likes;

                return (
                    <div key={item.id} style={{ marginBottom: '40px' }}>
                        <button onClick={handleNavigation} className="titleForPosts">
                            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '5px' }}>
                                {item.user && item.user.photo && (
                                    <img src={item.user.photo} alt="Profile" style={profilePicStyles} />
                                )}
                                <div>
                                    <h3>{item.profileName}</h3>
                                    <span>{item.user && item.user.username}</span>
                                </div>
                            </div>
                        </button>

                        <div style={{ width: 'auto', height: '250px', padding: '10px' }}>
                            <img src={item.photo} alt="Card" style={{ width: '100%', height: '100%' }} />
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
                            <span style={{ marginLeft: '3px' }}>{item.comments && item.comments.length}</span>
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