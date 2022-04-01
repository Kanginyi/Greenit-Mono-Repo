import React from "react";

import {FaRegThumbsUp, FaThumbsDown} from "react-icons/fa";

function DislikesPressed({likes, dislikes, likesFunction, undislikeFunction}) {
   return (
      <>
         <button
            onClick={likesFunction}
            className="likes-button"
         >
            <FaRegThumbsUp/>&nbsp;{likes}
         </button>

         <button
            onClick={undislikeFunction}
            className="dislikes-pressed"                    
         >
            <FaThumbsDown/>&nbsp;{dislikes}
         </button>
      </>
   );
}

export default DislikesPressed;