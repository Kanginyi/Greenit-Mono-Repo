import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

function Signup({setCurrentUser, setUserData}) {
   let navigate = useNavigate();

   // States to handle inputted values for username & password
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   // State to handle and any errors related to both username & password
   const [errorMessage, setErrorMessage] = useState([]);
   // State to handle show password functionality
   const [passwordInput, setPasswordInput] = useState("password");

   // Function to handle signing up with new user information
   // After signing up and the response comes back okay; setCurrentUser to new user's information, add that new user object to userData array, and setUserData to that new array
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
                     setUserData(allUsers => [...allUsers, user]);
                     navigate("/");
                  })
            } else {
               resp.json()
                  .then(error => {
                     // Remove "Password digest can't be blank" error message from initial errors array
                     const errorArray = error.errors.filter(error => error !== "Password digest can't be blank");

                     // Reorganize errors so username errors show before password errors
                     errorArray.reverse();

                     setErrorMessage(errorArray);
                  })
            }
         })
   };

   // Function to show or hide password when user clicks related checkbox
   const showPassword = () => {
      if (passwordInput === "password") {
         setPasswordInput("text");
      } else {
         setPasswordInput("password");
      }
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
               maxLength={30}
               value={username}
               onChange={e => setUsername(e.target.value)}
               autoComplete="off"
            />
            
            <input
               type={passwordInput}
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