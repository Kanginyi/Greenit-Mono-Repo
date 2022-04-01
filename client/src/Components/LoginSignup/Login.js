import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

function Login({setCurrentUser}) {
   let navigate = useNavigate();

   // States to handle inputted values for username & password. errorMessage will handle and render any errors related to username & password
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [errorMessage, setErrorMessage] = useState("");

   // Function to handle logging in with existing user credentials. After logging in, setCurrentUser to fetched user's object
   const handleLogin = e => {
      e.preventDefault();

      fetch("/login", {
         method: "POST",
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify({username, password})
      })
         .then(resp => {
            if (resp.ok) {
               resp.json()
                  .then(user => {
                     setCurrentUser(user);
                     navigate("/");
                  })
            } else {
               resp.json()
                  .then(error => {
                     setErrorMessage(error.error);
                  })
            }
         })
   };

   // State to handle show password functionality
   const [passwordInput, setPasswordInput] = useState("password");

   // Function to show or hide password when user clicks related checkbox
   const showPassword = () => {
      if (passwordInput === "password") {
         setPasswordInput("text");
      } else {
         setPasswordInput("password");
      }
   };

   return (
      <div className="login-container">
         <h2>LOGIN</h2>
         <form onSubmit={handleLogin}>
            <h3>Please enter your username and password!</h3>

            <input 
               type="text"
               name="username"
               placeholder="Username"
               value={username}
               onChange={e => setUsername(e.target.value)}
               autoComplete="off"
            />

            <input
               type={passwordInput}
               name="password"
               placeholder="Password"
               value={password}
               onChange={e => setPassword(e.target.value)}
               autoComplete="off"
            />

            <label>
               <input
                  type="checkbox"
                  onChange={showPassword}
               />
               &nbsp;Show Password
            </label>

            <button type="submit" className="login-button">LOGIN</button>

            <div className="error-message login-error">{errorMessage}</div>
         </form>
      </div>
   );
}

export default Login;