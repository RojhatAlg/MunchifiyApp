
import './App2.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Post from './components/Post/Post'
import SearchPage from './pages/SearchPage';
import AddPage from './pages/AddPage';
import NotificationPage from './pages/NotificationPage.jsx';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import EditProfileMenu from './pages/EditProfileMenu'
import EditProfile from './pages/EditProfilePage'



function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginPage />}></Route>
      <Route path="register" element={<SignupPage/>}></Route>
      <Route path="edit-profile" element={<EditProfileMenu/>}></Route>
        <Route path="/home" element={<Post />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/add" element={<AddPage />} />
        <Route path="/notification" element={<NotificationPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit-profile-page" element={<EditProfile/>}></Route>
        
       
      </Routes>
    </Router>
  );
}

export default App;

