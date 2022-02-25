import React from 'react';
import {useNavigate} from "react-router-dom";

function LogSignButtons({currentUser, setShowSignup}) {
   let navigate = useNavigate();

   const toLogin = () => {
      setShowSignup(false);

      navigate("/welcome");
   }

   const toSignup = () => {
      setShowSignup(true);

      navigate("/welcome");
   }

   return (
      <div className="user-section">

         <button
            id="login-button"
            onClick={toLogin}
            type="button"
         >
            Login
         </button>
         
         <button
            id="signup-button"
            onClick={toSignup}
            type="button"
         >
            Signup
         </button>

      </div>
   );
}

export default LogSignButtons;