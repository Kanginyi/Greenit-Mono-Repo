import React from "react";

import Login from "./Login";
import Signup from "./Signup";
import ErrorPage from '../Helpers/ErrorPage';

import "../../Stylings/LoginSignupForm.css";

function LoginSignupForm({currentUser, setCurrentUser, setUserData, showSignup, setShowSignup}) {
   return (
      <>
      {/* If a user is already logged in (the currentUser object exists), then render ErrorPage component. If not, then render Signup/Login components*/}
      {!currentUser
         ?
            <div className="login-signup-container">   
               {showSignup
                  ? 
                     <Signup setCurrentUser={setCurrentUser} setUserData={setUserData}/>
                  : 
                     <Login setCurrentUser={setCurrentUser}/>
               }

               {/* Based on the showSignup state, conditionally render Login or Signup elements */}
               <div className="login-signup-footer">
                  <p>
                     {showSignup ? "Already have an account?" : "Don't have an account?"}
                  </p>

                  <button
                     onClick={() => setShowSignup(prev => !prev)}
                  >
                     {showSignup ? "Login" : "Signup" }
                  </button>
               </div>
            </div>
         :
            <ErrorPage/>
      }
      </>
   );
}

export default LoginSignupForm;