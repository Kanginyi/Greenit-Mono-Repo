import React from "react";
import {useNavigate} from "react-router-dom";

import "../../Stylings/ErrorPage.css";

import greenit_logo from "../../Images/greenit-logo.png";

function ErrorPage() {
   let navigate = useNavigate();

   return (
      <div className="gtfo-logo">
         <h2>
            What are you doing here?
         </h2>
            <br/><br/>
         <img
            src={greenit_logo}
            alt="Greenit Logo, telling you to get outta here"
            title="Take me home!!"
            onClick={() => navigate("/")}
         />
            <br/><br/>
         <h3>
            You're in the wrong place, Greeniter.
         </h3>
            <br/>
         <h4>Click <span className="username-color">Greenie</span> to head home~</h4>
      </div>
   );
}

export default ErrorPage;