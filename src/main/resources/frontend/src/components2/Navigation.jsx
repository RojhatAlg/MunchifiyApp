import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import NotificationIcon from '@mui/icons-material/Notifications';
import ProfileIcon from '@mui/icons-material/Person';
import "./test.css"


function Navigation() {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/home');
  };

  const handleSearchClick = () => {
    navigate('/search');
  };

  const handleAddClick = () => {
    navigate('/add');
  };

  const handleNotificationsClick = () => {
    navigate('/notification');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div>
    <BottomNavigation className="bottom-navigation">
      <BottomNavigationAction label="Home" icon={<HomeIcon />} onClick={handleHomeClick} />
      <BottomNavigationAction label="Search" icon={<SearchIcon />} onClick={handleSearchClick} />
      <BottomNavigationAction label="Add" icon={<AddIcon />} onClick={handleAddClick} />
      <BottomNavigationAction label="Notifications" icon={<NotificationIcon />} onClick={handleNotificationsClick} />
      <BottomNavigationAction label="Profile" icon={<ProfileIcon />} onClick={handleProfileClick} />
    </BottomNavigation>
    </div>
  );
}

export default Navigation;
