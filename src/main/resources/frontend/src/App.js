
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage';
import AddPage from './pages/AddPage';
import NotificationPage from './pages/NotificationPage.jsx';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import EditProfileMenu from './pages/EditProfileMenu'
import EditProfile from './pages/EditProfilePage'
import CommentTest from './pages/CommentTest'
import FollowerPage from './pages/FollowerScreen'



function App() {
  return (
    <Router>
      <Routes>
          <Route path="*" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="register" element={<SignupPage/>}></Route>
      <Route path="edit-profile" element={<EditProfileMenu/>}></Route>
        <Route path="/home" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/add" element={<AddPage />} />
        <Route path="/notification" element={<NotificationPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit-profile-page" element={<EditProfile/>}></Route>
        <Route path="/comment" element={<CommentTest/>}></Route>
        <Route path="/follower" element={<FollowerPage/>}></Route>
          <Route path="/signup" element={<SignupPage/>}></Route>
       
      </Routes>
    </Router>
  );
}

export default App;

