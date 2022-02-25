import React from 'react';
import {useNavigate} from "react-router-dom";

function LogSignButtons({currentUser, setCurrentUser, setShowSignup}) {
  let navigate = useNavigate();

   const toLogin = () => {
      setShowSignup(false);

      navigate("/welcome");
   }

   const toSignup = () => {
      setShowSignup(true);

      navigate("/welcome");
   }

   // const toLogout = () => {
   //    fetch("/logout", {
   //       method: "DELETE"
   //    })
   //       // .then(resp => resp.json())
   //       // .then(data => setCurrentUser(data));
   // };
   
   const viewProfile = () => {
      navigate(`/users/${currentUser.id}`);
   }

   return (
      <div className="user-section">
        
         {
            currentUser
         ?
            // Greetings user|Logout button
            <>
               <p>
                  Hi <span className="username-color" onClick={viewProfile}>
                     {currentUser.username}
                  </span>!
               </p>

               <button
                  id="login-button"
                  // onClick={toLogout}
               >
                  Logout
               </button>
            </>
         :
            // Signup|Login buttons
            <>
               <button
                  id="signup-button"
                  onClick={toSignup}
               >
                  Signup
               </button>

               <button
                  id="login-button"
                  onClick={toLogin}
               >
                  Login
               </button>
            </>
         }

      </div>
   );
}

export default LogSignButtons;