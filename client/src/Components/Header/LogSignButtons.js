import React from 'react';
import {useNavigate} from "react-router-dom";

import {FaRegSmileBeam} from "react-icons/fa";

function LogSignButtons({currentUser, setCurrentUser, setShowSignup}) {
   let navigate = useNavigate();

   // Function to navigate to clicked user's profile when user clicks related button
   const viewYourProfile = () => {
      navigate(`/all_users/${currentUser?.id}`);
   };

   // Function to logout user, setCurrentUser to null, and navigate back to homepage
   const toLogout = () => {
      fetch("/logout", {
         method: "DELETE"
      });
 
      setCurrentUser(null);
      
      navigate("/");
   };

   // Function to navigate to Login component when showSignup is false
   const toLogin = () => {
      setShowSignup(false);

      navigate("/welcome");
   };

   // Function to navigate to Signup component when showSignup is true
   const toSignup = () => {
      setShowSignup(true);

      navigate("/welcome");
   };

   return (
      <div className="user-section">
         {/* If the currentUser object exists, conditionally render username & logout buttons OR signup & login buttons*/}
         {
            currentUser
         ?
            // Username|Logout buttons
            <>
               <button
                  onClick={viewYourProfile}
                  className="username-color signup-button"
                  style={{fontWeight: "600"}}
               >
                  <FaRegSmileBeam/>&nbsp;{currentUser?.username}
               </button>

               <button
                  onClick={toLogout}
                  className="login-button"
               >
                  Logout
               </button>
            </>
         :
            // Signup|Login buttons
            <>
               <button
                  onClick={toSignup}
                  className="signup-button"
               >
                  Signup
               </button>

               <button
                  onClick={toLogin}
                  className="login-button"
               >
                  Login
               </button>
            </>
         }

      </div>
   );
}

export default LogSignButtons;