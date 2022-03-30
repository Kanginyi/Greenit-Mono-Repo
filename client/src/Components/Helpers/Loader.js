import React from "react";

import "../../Stylings/Loader.css";

function Loader() {
   return (
      <div className="loading-ring">
         LOADING...
         <span className="loading-span"></span>
      </div>
   );
}

export default Loader;