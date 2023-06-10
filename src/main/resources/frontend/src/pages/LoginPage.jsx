import React from 'react';
import '../App2.css';
import { useNavigate } from 'react-router-dom';


function LoginPage() {
 

  const title = "Munchify";
  const usrName = "username/email";
  const passwrd = "password";

  const navigate = useNavigate()

  function handleLogin(){
    navigate("/home")
  }
  function handleSignup(){
    navigate("/register")
  }

  return (
    <div>
      <h1 className="nameOfMuseum">{title}</h1>
    <p className="aligningText">{usrName}</p>
    <div className="searchBox2">
    <input type="text" placeholder="username"/>
    </div>

    <p className="aligningText">{passwrd}</p>
    <div className="searchBox2">
    <input type="text" placeholder="password" />
    </div>
    
    <button className="login-button" onClick={handleLogin}>Log in</button>
    <br/>
    <button className="signup-button" onClick={handleSignup}>Sign up</button>
    


    </div>
  );
}

export default LoginPage;
