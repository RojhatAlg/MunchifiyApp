import React, {useEffect, useState} from 'react';
import '../App.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


function LoginPage() {
 

  const title = "Munchify";
  const usrName = "username/email";
  const passwrd = "password";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("")
  const [userId, setUserId] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);




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
      setLoggedIn(true)
      console.log("successfully logged inn")
    }else{
      console.log("login failed")

      }
    }

  useEffect(() => {
    if(loggedIn){
      async function fetchUserId(){
        const res = await fetch("http://localhost:8080/api/login")
        const data = await res.json();
        setUserId(data);
        console.log(data)
      }
      fetchUserId()
    }
  }, [loggedIn])



  if (loggedIn){
    function getCookieValue(name) {
      return Cookies.get(name);
    }
    const cookieValue = getCookieValue('user_id');
    console.log(cookieValue);
  }




  function handleSignup(){
    navigate("/signup");
  };


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
