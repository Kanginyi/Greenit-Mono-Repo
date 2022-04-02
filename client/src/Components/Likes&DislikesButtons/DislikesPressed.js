import React from "react";

import {FaRegThumbsUp, FaThumbsDown} from "react-icons/fa";

function DislikesPressed({id, postLikes, setPostLikes, postDislikes, setPostDislikes, handlePostLikes, handleUndislikePost, clickedNum, setClickedNum}) {
   return (
      <>
         {/* Anonymous function to handle passed in likesFunction. Passing in the required parameters to handle liking posts through handlePostLikes in App.js */}
         <button
            onClick={() => handlePostLikes(id, setPostLikes, setPostDislikes, clickedNum, setClickedNum)}
            className="likes-button"
         >
            <FaRegThumbsUp/>&nbsp;{postLikes}
         </button>

         {/* Anonymous function to handle passed in undislikeFunction. Passing in the required parameters to handle undisliking posts through handleUndislikePost in App.js */}
         <button
            onClick={() => handleUndislikePost(id, setPostDislikes, setClickedNum)}
            className="dislikes-pressed"                    
         >
            <FaThumbsDown/>&nbsp;{postDislikes}
         </button>
      </>
   );
}

export default DislikesPressed;