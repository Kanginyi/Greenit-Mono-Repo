import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";

function Signup({setCurrentUser, setUserData}) {
   let navigate = useNavigate();

   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [errorMessage, setErrorMessage] = useState([]);

   const handleSignup = e => {
      e.preventDefault();

      fetch("/signup", {
         method: "POST",
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify({username, password})
      })
         .then(resp => {
            if (resp.ok) {
               resp.json()
                  .then(user => {
                     setCurrentUser(user);
                     setUserData(allUsers => [...allUsers, user])
                     navigate("/");
                  })
            } else {
               resp.json()
                  .then(error => {
                     const errorArray = error.errors.filter(error => error !== "Password digest can't be blank");
                     errorArray.reverse();
                     setErrorMessage(errorArray);
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
      <div className="signup-container">
         <h2>SIGNUP</h2>
         <form onSubmit={handleSignup}>
            <h3>Please enter your desired username and password!</h3>

            <input
               type="text"
               name="username"
               placeholder="Enter a Username!"
               value={username}
               onChange={e => setUsername(e.target.value)}
               autoComplete="off"
            />
            
            <input
               type={inputPassword}
               name="password"
               placeholder="Enter a Password!"
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

            <button type="submit" className="signup-button">SIGNUP</button>

            <div className="error-message signup-error">
               {errorMessage?.map(error => <p>{error}</p>)}
            </div>
         </form>
      </div>
   );
}

export default Signup;