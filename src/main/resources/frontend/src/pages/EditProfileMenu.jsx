import React from 'react';
import backButton from '../assets/backButton.png';
import { useNavigate } from 'react-router';
import '../App.css';

function EditProfileMenu() {
  const profile = "Profile";
  const feedback = "Feedback";
  const support = "Support";
  const logOut = "Log out";

  const navigate = useNavigate();


  function handleLogout(){
    navigate("/");
  }
  function goToHomePage(){
    navigate("/home")
  }

  function goToProfilePage(){
    navigate("/edit-profile-page");
  }

  return (
    <div className="edit-profile-menu">
      <button className="back-button" onClick={goToHomePage}>
        <img src={backButton} alt=''/>
      </button>
      <div className="button-container">
        <button onClick={goToProfilePage}>{profile}</button>
        <button>{feedback}</button>
        <button>{support}</button>
      </div>
      <button className="logout-button" onClick={handleLogout}>{logOut}</button>
    </div>
  );
}

export default EditProfileMenu;
