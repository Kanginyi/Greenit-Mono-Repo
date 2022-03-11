import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

function Login({setCurrentUser}) {
   let navigate = useNavigate();

   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [errorMessage, setErrorMessage] = useState("");

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

   // Show password functionality
   const [inputPassword, setInputPassword] = useState("password");

   const showPassword = () => {
      if (inputPassword === "password") {
         setInputPassword("text");
      } else {
         setInputPassword("password");
      }
   }

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
               type={inputPassword}
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