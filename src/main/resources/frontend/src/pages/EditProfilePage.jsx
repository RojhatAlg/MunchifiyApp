import React from 'react';
import '../App.css';
import backButton from '../assets/backButton.png'
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const profileData = [
    { label: 'Name', value: 'John Doe' },
    { label: 'Avatar', value: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D&w=1000&q=80' },
    { label: 'Bio', value: 'I am a software developer.' }
  ];
  const navigate = useNavigate();
  console.log('Checking activity');
    
    function goToEditProfileMenu(){
      navigate("/edit-profile")
    }

  const handleActivityClick = () => {
    
  };

  return (
    <div className="profile-container">
      <h1 className="heading">Profile P
      <button className="edit-back-button" onClick={goToEditProfileMenu}>
        <img src={backButton} alt=''/>
      </button>age</h1>
      <div className="profile-info">
        <h2 className="sub-heading">Profile Information:</h2>
        {profileData.map((item) => (
          <div key={item.label} className="profile-item">
            <label className="profile-label">{item.label}:</label>
            {item.label === 'Avatar' ? (
              <img className="avatar" src={item.value} alt="Avatar" />
            ) : (
              <span>{item.value}</span>
            )}
          </div>
        ))}
        <div className="profile-item">
          <button className="activity-button" onClick={handleActivityClick}>
            Activity
          </button>
        </div>
      </div>

    </div>
  );
}

export default ProfilePage;
