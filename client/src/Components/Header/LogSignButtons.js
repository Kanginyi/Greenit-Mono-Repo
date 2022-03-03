import React from 'react';
import {useNavigate} from "react-router-dom";

import {FaRegSmileBeam} from "react-icons/fa";

function LogSignButtons({currentUser, setCurrentUser, postData, setPostData, userData, setUserData, commentData, setCommentData, setShowSignup}) {
  let navigate = useNavigate();

   const toLogin = () => {
      setShowSignup(false);

      navigate("/welcome");
   }

   const toSignup = () => {
      setShowSignup(true);

      navigate("/welcome");
   }

   const toLogout = () => {
      fetch("/logout", {
         method: "DELETE"
      });
 
      setCurrentUser(null);
      
      setPostData(postData);
      setUserData(userData);
      setCommentData(commentData);

      navigate("/");
   };
   
   const viewProfile = () => {
      navigate(`/all_users/${currentUser.id}`);
   }

   return (
      <div className="user-section">
        
         {
            currentUser
         ?
            // Greetings user|Logout button
            <>
               <button
                  className="username-color signup-button"
                  onClick={viewProfile}
                  style={{fontWeight: "600"}}
               >
                     <FaRegSmileBeam/>&nbsp;{currentUser.username}
               </button>

               <button
                  className="login-button"
                  onClick={toLogout}
               >
                  Logout
               </button>
            </>
         :
            // Signup|Login buttons
            <>
               <button
                  className="signup-button"
                  onClick={toSignup}
               >
                  Signup
               </button>

               <button
                  className="login-button"
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