import React from "react";

import {FaRegThumbsUp, FaThumbsDown} from "react-icons/fa";

function DislikesPressed({id, likes, setLikes, dislikes, setDislikes, likesFunction, undislikeFunction, clickedNum, setClickedNum}) {
   return (
      <>
         <button
            onClick={() => likesFunction(id, setLikes, setDislikes, clickedNum, setClickedNum)}
            className="likes-button"
         >
            <FaRegThumbsUp/>&nbsp;{likes}
         </button>

         <button
            onClick={() => undislikeFunction(id, setDislikes, setClickedNum)}
            className="dislikes-pressed"                    
         >
            <FaThumbsDown/>&nbsp;{dislikes}
         </button>
      </>
   );
}

export default DislikesPressed;