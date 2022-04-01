import React from "react";

import {FaThumbsUp, FaRegThumbsDown} from "react-icons/fa";

function LikesPressed({likes, dislikes, unlikeFunction, dislikesFunction}) {
   return (
      <>
         <button
            onClick={unlikeFunction}
            className="likes-pressed"
         >
            <FaThumbsUp/>&nbsp;{likes}
         </button>

         <button
            onClick={dislikesFunction}
            className="dislikes-button"                    
         >
               <FaRegThumbsDown/>&nbsp;{dislikes}
         </button>
      </>
   );
}

export default LikesPressed;