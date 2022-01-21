import React from 'react';

function LogSign() {
   return (
      <div className="user-section">

         <button
            id="login-button"
            onClick={() => alert("Bing Bong")}
            type="button"
         >
            Login
         </button>
         
         <button
            id="signup-button"
            onClick={() => alert("Bong Bing")}
            type="button"
         >
            Signup
         </button>

      </div>
   );
}

export default LogSign;