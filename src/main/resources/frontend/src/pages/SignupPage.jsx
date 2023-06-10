import React from 'react';
import '../App2.css';


function SignupPage() {
 

  const title = "Munchify";
  const name = "name";
  const userSurname = "surname";
  const userName = "username";
  const userEmail = "e-mail adress";
  const userPassword = "password";

  return (
    <div>
      <h1 className="nameOfMuseum">{title}</h1>
    <p className="aligningText">{name}</p>
    <div className="searchBox2">
    <input type="text" placeholder="username"/>
    </div>

    <p className="aligningText">{userSurname}</p>
    <div className="searchBox2">
    <input type="text" placeholder="password" />
    </div>
    
    <p className="aligningText">{userName}</p>
    <div className="searchBox2">
    <input type="text" placeholder="password" />
    </div>

    <p className="aligningText">{userEmail}</p>
    <div className="searchBox2">
    <input type="text" placeholder="password" />
    </div>

    <p className="aligningText">{userPassword}</p>
    <div className="searchBox2">
    <input type="text" placeholder="password" />
    </div>

    <button className="login-button">Register</button>
   
    


    </div>
  );
}

export default SignupPage;
