import React, { useState, useEffect } from 'react';
import './Post.css';

const Post = () => {
    const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState([]);
    const [users, setUsers] = useState({});
    const [replyText, setReplyText] = useState('');
    const [replyCommentId, setReplyCommentId] = useState(null);

    useEffect(() => {
        // Fetch the likes data from the backend API
        fetch('/api/likes')
            .then((response) => response.json())
            .then((data) => {
                // Calculate the total number of likes
                const totalLikes = data.length;
                setLikes(totalLikes);
            })
            .catch((error) => {
                console.error('Error fetching likes:', error);
            });

        // Fetch the users data from the backend API
        fetch('/api/users')
            .then((response) => response.json())
            .then((data) => {
                // Create a map of userId to user object
                const usersMap = data.reduce((map, user) => {
                    map[user.id] = user;
                    return map;
                }, {});
                setUsers(usersMap);
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
            });
    }, []);

    const handleCommentClick = () => {
        // Fetch the comments data from the backend API
        fetch('/api/comments')
            .then((response) => response.json())
            .then((data) => {
                setComments(data);
            })
            .catch((error) => {
                console.error('Error fetching comments:', error);
            });
    };

    const handleReplySubmit = (commentId) => {
        const reply = {
            commentId: commentId,
            text: replyText,
            userId: 1,
            date: new Date().toISOString()
        };

        fetch('/api/replies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reply)
        })
            .then((response) => response.json())
            .then((data) => {
                setComments((prevComments) => {
                    // Create a shallow copy of the previous comments state
                    const updatedComments = [...prevComments];

                    // Find the comment to update
                    const commentIndex = updatedComments.findIndex((comment) => comment.id === commentId);

                    if (commentIndex !== -1) {
                        // Create a shallow copy of the comment
                        const updatedComment = { ...updatedComments[commentIndex] };

                        // Update the replies of the comment
                        updatedComment.replies = [...updatedComment.replies, data];

                        // Update the comment in the comments array
                        updatedComments[commentIndex] = updatedComment;
                    }

                    return updatedComments;
                });
            })
            .catch((error) => {
                console.error('Error submitting reply:', error);
            });

        setReplyText('');
        setReplyCommentId(null);
    };


    return (
        <div className="post">
            <img src="https://c4.wallpaperflare.com/wallpaper/108/140/869/digital-digital-art-artwork-fantasy-art-drawing-hd-wallpaper-thumb.jpg" alt="Post" />
            <button style={buttonStyle} onClick={() => setLikes(likes + 1)}>
                Likes: {likes}
            </button>
            <button style={buttonStyle} onClick={handleCommentClick}>
                Comments
            </button>
            <div className="comments" style={commentsStyle}>
                {comments.map((comment) => (
                    <div key={comment.id} className="comment">
                        <p className="comment-date">Date: {comment.date}</p>
                        <p className="comment-text">{users[comment.userId]?.name}: {comment.text}</p>
                        <div className="comment-replies">
                            {replyCommentId === comment.id && (
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Write a reply..."
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                    />
                                    <button onClick={() => handleReplySubmit(comment.id)}>Send</button>
                                </div>
                            )}
                            <button onClick={() => setReplyCommentId(comment.id)}>Reply</button>
                            {comment.replies.map((reply) => (
                                <div key={reply.id} className="reply">
                                    <span className="reply-user">Reply by {users[reply.userId]?.name}</span>
                                    <span className="reply-date"> - {new Date(reply.date).toLocaleString()}</span>
                                    <div className="reply-text">{reply.text}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const buttonStyle = {
    marginBottom: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#f1f1f1',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};

const commentsStyle = {
    width: '100%',
    backgroundColor: '#f1f1f1',
    borderRadius: '8px',
    padding: '10px',
    marginTop: '20px',
};

export default Post;
