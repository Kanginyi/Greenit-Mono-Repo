import React from 'react';
import Signup from "./Signup";
import Login from "./Login";

// Pass down currentUser into this component
function LoginSignupForm({setCurrentUser, setUserData, showSignup, setShowSignup}) {    
   return (
      <>
      {showSignup
         ? <Signup setCurrentUser={setCurrentUser} setUserData={setUserData}/>
         : <Login setCurrentUser={setCurrentUser}/>
      }

      <div>
         <p>{showSignup ? "Already have an account?" : "Don't have an account?"}</p>
         <button
            onClick={() => setShowSignup(prev => !prev)}
         >
            {showSignup ? "Login" : "Signup" }
         </button>
      </div>

      </>
   );
}

export default LoginSignupForm;