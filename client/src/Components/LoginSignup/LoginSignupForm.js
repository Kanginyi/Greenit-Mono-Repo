import React from 'react';
import Signup from "./Signup";
import Login from "./Login";

import "../../Stylings/LoginSignupForm.css";

// Pass down currentUser into this component
function LoginSignupForm({setCurrentUser, setUserData, showSignup, setShowSignup}) {    
   return (
      <div className="login-signup-container">
            
         {showSignup
            ? <Signup setCurrentUser={setCurrentUser} setUserData={setUserData}/>
            : <Login setCurrentUser={setCurrentUser}/>
         }

         <div className="login-signup-footer">
            <p>{showSignup ? "Already have an account?" : "Don't have an account?"}</p>
            <button
               onClick={() => setShowSignup(prev => !prev)}
            >
               {showSignup ? "Login" : "Signup" }
            </button>
         </div>

      </div>
   );
}

export default LoginSignupForm;