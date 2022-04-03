import React from "react";

import {FaThumbsUp, FaRegThumbsDown} from "react-icons/fa";

function LikesPressed({id, likes, setLikes, dislikes, setDislikes, unlikeFunction, dislikesFunction, clickedNum, setClickedNum}) {
   return (
      <>
         {/* Anonymous function to trigger unlikeFunction when button is clicked. Pass in the required parameters to handle unliking blogs through unlikeFunction in App.js */}
         <button
            onClick={() => unlikeFunction(id, setLikes, setClickedNum)}
            className="likes-pressed"
         >
            <FaThumbsUp/>&nbsp;{likes}
         </button>

         {/* Anonymous function to trigger dislikesFunction when button is clicked. Pass in the required parameters to handle disliking blogs through dislikesFunction in App.js */}
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