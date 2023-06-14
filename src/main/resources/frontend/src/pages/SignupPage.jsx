import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const title = 'Munchify';
  const name1 = 'name';
  const userSurname = 'surname';
  const userName = 'username';
  const userEmail = 'e-mail address';
  const userPassword = 'password';

  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();

    // Validate form fields
    if (!name || !surname || !username || !email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, surname, username, email, password }),
      });

      if (response.ok) {
        navigate('/login');
        console.log('Successfully signed up');
      } else {
        // Handle other response statuses, e.g., duplicate username or email
        console.log('Failed to sign up:', response.statusText);
        setErrorMessage('Failed to sign up. Please try again.');
      }
    } catch (error) {
      console.log('Error signing up:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  }

  return (
      <div>
        <h1 className="nameOfMuseum">{title}</h1>
        <p className="error-message">{errorMessage}</p>

        <form>
          <p className="aligningText">{name1}</p>
          <div className="searchBox2">
            <input type="text" placeholder="name" onChange={e => setName(e.target.value)} />
          </div>

          <p className="aligningText">{userSurname}</p>
          <div className="searchBox2">
            <input type="text" placeholder="surname" onChange={e => setSurname(e.target.value)} />
          </div>

          <p className="aligningText">{userName}</p>
          <div className="searchBox2">
            <input type="text" placeholder="username" onChange={e => setUsername(e.target.value)} />
          </div>

          <p className="aligningText">{userEmail}</p>
          <div className="searchBox2">
            <input type="email" placeholder="email" onChange={e => setEmail(e.target.value)} />
          </div>

          <p className="aligningText">{userPassword}</p>
          <div className="searchBox2">
            <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
          </div>

          <button className="login-button" onClick={handleSignup}>Register</button>
        </form>
      </div>
  );
}

export default SignupPage;
