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
               type="password"
               name="password"
               placeholder="Enter a Password!"
               value={password}
               onChange={e => setPassword(e.target.value)}
               autoComplete="off"
            />

            <div className="error-message">
               {errorMessage?.map(error => <p>{error}</p>)}
            </div>

            <button type="submit" className="signup-button">SIGNUP</button>

         </form>
      </div>
   );
}

export default Signup;