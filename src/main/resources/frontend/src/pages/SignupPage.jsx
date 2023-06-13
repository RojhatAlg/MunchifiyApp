import React, { useState } from 'react';
import '../App2.css';
import { useNavigate } from 'react-router-dom';

function SignupPage() {

  const [name, setName] = useState("")
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  const title = "Munchify";
  const name1 = "name";
  const userSurname = "surname";
  const userName = "username";
  const userEmail = "e-mail adress";
  const userPassword = "password";

  const navigate = useNavigate()

    async function handleSignup(e){
      e.preventDefault()

      const response = await fetch("http://localhost:8080/api/signup", {
        method:"POST",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify({name, surname, username, email, password})
      })

      if (response.ok){
        navigate("/api/login")
        console.log("successfully logged inn")
      }

    }

  return (
    <div>
      <h1 className="nameOfMuseum">{title}</h1>
    <p className="aligningText">{name1}</p>
    <div className="searchBox2">
    <input type="text" placeholder="username" onChange={e => setName(e.target.value)}/>
    </div>

    <p className="aligningText">{userSurname}</p>
    <div className="searchBox2">
    <input type="text" placeholder="surname" onChange={e => setSurname(e.target.value)}/>
    </div>

    <p className="aligningText">{userName}</p>
    <div className="searchBox2">
    <input type="text" placeholder="username" onChange={e => setUsername(e.target.value)}/>
    </div>

    <p className="aligningText">{userEmail}</p>
    <div className="searchBox2">
    <input type="email" placeholder="email" onChange={e => setEmail(e.target.value)}/>
    </div>

    <p className="aligningText">{userPassword}</p>
    <div className="searchBox2">
    <input type="text" placeholder="password" onChange={e => setPassword(e.target.value)}/>
    </div>

    <button className="login-button" onClick={handleSignup}>Register</button>




    </div>
  );
}

export default SignupPage;
