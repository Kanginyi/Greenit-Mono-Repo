import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";

function Signup({setCurrentUser, setUserData}) {
   let navigate = useNavigate();

   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [errorMessage, setErrorMessage] = useState("");

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
                     setErrorMessage(error.errors)
                  })
            }
         })
   };

   return (
      <div>
         <form onSubmit={handleSignup}>
            <h1>SIGNUP</h1>

            <label>Enter a Username!</label>
            <input
               type="text"
               name="username"
               value={username}
               onChange={e => setUsername(e.target.value)}
               autoComplete="off"
            />

            <label>Enter a Password!</label>
            <input
               type="password"
               value={password}
               onChange={e => setPassword(e.target.value)}
               autoComplete="off"
            />

            <button type="submit">Signup</button>

            <div>{errorMessage}</div>
         </form>
      </div>
   );
}

export default Signup;