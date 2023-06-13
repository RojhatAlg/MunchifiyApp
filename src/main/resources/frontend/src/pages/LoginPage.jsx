import React, {useState} from 'react';
import '../App2.css';
import { useNavigate } from 'react-router-dom';


function LoginPage() {
 

  const title = "Munchify";
  const usrName = "username/email";
  const passwrd = "password";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  async function handleLogin(e){
    e.preventDefault()

    const response = await fetch("http://localhost:8080/api/login", {
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify({username, password})
    })

    if (response.ok){
      navigate("/home")
      console.log("successfully logged inn")
    }else{
      console.log("login failed")

      }
    }


  function handleSignup(){
    //navigate("/register")
    console.log("B")
  }

  return (
    <div>
      <h1 className="nameOfMuseum">{title}</h1>
    <p className="aligningText">{usrName}</p>
    <div className="searchBox2">
    <input type="text" placeholder="username" onChange={e => setUsername(e.target.value)}/>
    </div>

    <p className="aligningText">{passwrd}</p>
    <div className="searchBox2">
    <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)}/>
    </div>
    
    <button className="login-button" onClick={handleLogin}>Log in</button>
    <br/>
    <button className="signup-button" onClick={handleSignup}>Sign up</button>
    


    </div>
  );
}

export default LoginPage;
