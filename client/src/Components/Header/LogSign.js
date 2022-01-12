import React from 'react';

function LogSign() {
   return (
      <div className="user-section">

         <div className="log-btn">
            <button onClick={() => alert("Bing Bong")} type="submit">Login</button>
         </div>

         <div className="sign-btn">
            <button onClick={() => alert("Bong Bing")} type="submit">Sign Up</button>
         </div>
         
      </div>
   );
}

export default LogSign;