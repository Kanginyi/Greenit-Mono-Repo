import React from "react";

import {FaRegThumbsUp, FaRegThumbsDown} from "react-icons/fa";

function NeitherPressed({likes, dislikes, likesFunction, dislikesFunction, errorMessage}) {
   return (
      <>
         <button
            onClick={likesFunction}
            className="likes-button"
         >
            <FaRegThumbsUp/>&nbsp;{likes}
         </button>

         <div className="error-message">{errorMessage}</div>

         <button
            onClick={dislikesFunction}
            className="dislikes-button"
         >
            <FaRegThumbsDown/>&nbsp;{dislikes}
         </button>
      </>
   );
}

export default NeitherPressed;