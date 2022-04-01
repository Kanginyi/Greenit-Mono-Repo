import React from "react";

import {FaThumbsUp, FaRegThumbsDown} from "react-icons/fa";

function LikesPressed({id, likes, setLikes, dislikes, setDislikes, unlikeFunction, dislikesFunction, clickedNum, setClickedNum}) {
   return (
      <>
         <button
            onClick={() => unlikeFunction(id, setLikes, setClickedNum)}
            className="likes-pressed"
         >
            <FaThumbsUp/>&nbsp;{likes}
         </button>

         <button
            onClick={() => dislikesFunction(id, setLikes, setDislikes, clickedNum, setClickedNum)}
            className="dislikes-button"                    
         >
            <FaRegThumbsDown/>&nbsp;{dislikes}
         </button>
      </>
   );
}

export default LikesPressed;

// id, setLikes, setDislikes, clickedNum, setClickedNum