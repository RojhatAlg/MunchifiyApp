import React, { useEffect, useState } from 'react';

function CommentList() {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetch('/api/comments')
            .then(response => response.json())
            .then(data => setComments(data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <h2>Comments</h2>
            {comments.map(comment => (
                <div key={comment.id}>
                    <p>{comment.text}</p>
                    <p>By: {comment.user}</p>
                </div>
            ))}
        </div>
    );
}

export default CommentList;
