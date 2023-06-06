import React, { useState, useEffect } from 'react';

const CommentList = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch comments from the backend API
    fetch('/api/comments')
        .then(response => response.json())
        .then(data => setComments(data))
        .catch(error => console.error(error));
  }, []);

  return (
      <div>
        <h1>Comments</h1>
        {comments.map(comment => (
            <div key={comment.id}>
              <p>{comment.text}</p>
              <p>By: {comment.user.name}</p>
              <hr />
            </div>
        ))}
      </div>
  );
};

export default CommentList;
