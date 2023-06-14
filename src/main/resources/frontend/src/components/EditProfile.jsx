import React from 'react';
import '../App.css';
import DotIcon from '@mui/icons-material/MoreHoriz';
import { useNavigate } from 'react-router';


//import ImageSelectionScreen from './components/ImageSelectionScreen';


function EditProfile() {
    const navigate = useNavigate()

  
  function handleClick(){
    navigate("/edit-profile");
} 

  return (
    <div className="edit-profile-button-container">
  <button className="edit-profile-button" onClick={handleClick}>
    <DotIcon />
  </button>
</div>

  );
  };

export default EditProfile;
