import React, {useState} from 'react';
import '../src/login.scss';
import {Link} from 'react-router-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

// Sign up function 
function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [comparePassword, setComparePassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  
  
  function attemptLogin(e){
    e.preventDefault();
    // Attempt login function checks if the attempted sign up checks if password and if compared password mathc, if not throw an error
    if (password !== comparePassword){
      return alert('Passwords Must Match!');
    }

    const loginInfo = {
      username: username,
      password: password
    }
    
    // When the Passwords Match Make a request to the server to create an account
    fetch('/SignUp', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(loginInfo) // body data type must match "Content-Type" header
    })
    // When Sucessful update the state to true
    .then(data => {
      setLoggedIn(true)
      console.log('Successfully Sent to Server')
    })
    // Error Consoled 
    .catch(err => console.log(err));
  }


  return (
    //TERNARY TO CHECK IF loggedIn is true or false, if true redirect to "/Lobby", if flase do nothing
    loggedIn ? <Redirect to="/Lobby" /> : <div>
    <h1 className="form__title">Create Account</h1>
    <div className="form__message form__message--error" />
    <div className="form__input-group">
     <input type="text" id="signupUsername" className="form__input" value={username} onChange={(e) => setUsername(e.target.value)}  autofocus="true" placeholder="Username" />
      <div className="form__input-error-message" />
    </div>
    {/* <div className="form__input-group">
      <input type="text" className="form__input" autofocus="true" placeholder="Email Address" />
      <div className="form__input-error-message" />
    </div> */}
    <div className="form__input-group">
      <input type="password" className="form__input" autofocus="true" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <div className="form__input-error-message" />
    </div>
    <div className="form__input-group">
      <input type="password" className="form__input" autofocus="true" placeholder="Confirm password" value={comparePassword} onChange={(e) => setComparePassword(e.target.value)} />
      <div className="form__input-error-message" />
    </div>
    <button className="form__button" type="submit" onClick={attemptLogin}>Continue</button>
    <p className="form__text">
   <Link className="form__link" to="/Login" id="linkLogin">Already have an account? Sign in</Link>
    </p>
  </div>
  )
}

export default SignUp