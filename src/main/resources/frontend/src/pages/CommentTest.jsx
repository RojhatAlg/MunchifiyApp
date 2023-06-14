import React, { useState } from "react";
import Modal from "react-modal";
import CommentIcon from "@mui/icons-material/Comment";
import scenery2 from "../assets/scenery2.jpg";

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newComment, setNewComment] = useState("");

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    setComments([...comments, { username: "John", text: newComment }]);
    setNewComment("");
  };

  return (
    <div>
      <img
        src={scenery2}
        alt="Comment Image"
        style={{ width: "200px", height: "100px" }}
      />
      <div>
        <CommentIcon style={{ cursor: "pointer" }} onClick={handleModalOpen} />
        <span>{comments.length}</span>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        style={modalStyles}>
        <div style={modalContentStyles}>
          <p>Comment section</p>
          <div style={commentListStyles}>
            {comments.map((comment, index) => (
              <div key={index} style={commentStyles}>
                <img src={scenery2} alt="Profile" style={profilePicStyles} />

                <span style={usernameStyles}>{comment.username}:</span>
                <span>{comment.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={commentFormStyles}>
          <form onSubmit={handleCommentSubmit}>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Enter your comment"
              style={inputStyles}
            />
            <button type="submit" style={submitButtonStyles}>
              Submit
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

const modalStyles = {
  content: {
    width: "90%",
    margin: "auto",
    padding: "20px",
    borderRadius: "8px",
  },
};

const modalContentStyles = {};

const commentListStyles = {
  marginTop: "20px",
  display: "flex",
  flexDirection: "column",
};

const commentStyles = {
  display: "flex",
  alignItems: "center",
  marginBottom: "10px",
};

const profilePicStyles = {
  width: "30px",
  height: "30px",
  borderRadius: "50%",
  marginRight: "10px",
};

const usernameStyles = {
  fontWeight: "bold",
  marginRight: "10px",
};

const commentFormStyles = {
  marginTop: "auto",
};

const inputStyles = {
  width: "50%",
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const submitButtonStyles = {
  backgroundColor: "#4caf50",
  color: "white",
  padding: "8px 16px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default CommentSection;
