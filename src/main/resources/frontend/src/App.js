import React, { useState, useEffect } from 'react';
import './App.css';

const Post = () => {
    const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState([]);

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
                    <div key={comment.id}>
                        <p>{comment.text}</p>
                        <p>By User ID: {comment.userId}</p>
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
    width: '300px',
    backgroundColor: '#f1f1f1',
    borderRadius: '5px',
    padding: '10px',
};

export default Post;
