import React from "react";

import {FaRegThumbsUp, FaThumbsDown} from "react-icons/fa";

function DislikesPressed({id, likes, setLikes, dislikes, setDislikes, likesFunction, undislikeFunction, clickedNum, setClickedNum}) {
   return (
      <>
         {/* Anonymous function to handle passed in likesFunction. Passing in the required parameters to handle liking posts through handlePostLikes in App.js */}
         <button
            onClick={() => likesFunction(id, setLikes, setDislikes, clickedNum, setClickedNum)}
            className="likes-button"
         >
            <FaRegThumbsUp/>&nbsp;{likes}
         </button>

         {/* Anonymous function to handle passed in undislikeFunction. Passing in the required parameters to handle undisliking posts through handleUndislikePost in App.js */}
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