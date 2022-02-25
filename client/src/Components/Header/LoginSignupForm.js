import React from 'react';
import {useNavigate} from "react-router-dom";
import Login from './Login';

// Pass down currentUser into this component
function LoginSignupForm({currentUser, setCurrentUser, showSignup, setShowSignup}) {
   let navigate = useNavigate();
   
   // Things for signing up
   const handleSignup = e => {
      e.preventDefault();

      console.log("asdf");
   }
  
   return (
      <>
      {showSignup
         ? "Signup Form XD"
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