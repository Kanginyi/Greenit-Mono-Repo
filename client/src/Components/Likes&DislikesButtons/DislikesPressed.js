import React from "react";

import {FaRegThumbsUp, FaThumbsDown} from "react-icons/fa";

function DislikesPressed({id, likes, setLikes, dislikes, setDislikes, likesFunction, undislikeFunction, clickedNum, setClickedNum}) {
   return (
      <>
         {/* Anonymous function to trigger likesFunction when button is clicked. Pass in the required parameters to handle liking blogs through likesFunction in App.js */}
         <button
            onClick={() => likesFunction(id, setLikes, setDislikes, clickedNum, setClickedNum)}
            className="likes-button"
         >
            <FaRegThumbsUp/>&nbsp;{likes}
         </button>

         {/* Anonymous function to trigger undislikeFunction when button is clicked. Pass in the required parameters to handle undisliking blogs through undislikeFunction in App.js */}
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