import React from "react";

import {FaThumbsUp, FaRegThumbsDown} from "react-icons/fa";

function LikesPressed({id, postLikes, setPostLikes, postDislikes, setPostDislikes, handleUnlikePost, handlePostDislikes, clickedNum, setClickedNum}) {
   return (
      <>
         {/* Anonymous function to trigger handleUnlikePost when button is clicked. Pass in the required parameters to handle unliking posts through handleUnlikePost in App.js */}
         <button
            onClick={() => handleUnlikePost(id, setPostLikes, setClickedNum)}
            className="likes-pressed"
         >
            <FaThumbsUp/>&nbsp;{postLikes}
         </button>

         {/* Anonymous function to trigger handlePostDislikes when button is clicked. Pass in the required parameters to handle disliking posts through handlePostDislikes in App.js */}
         <button
            onClick={() => handlePostDislikes(id, setPostLikes, setPostDislikes, clickedNum, setClickedNum)}
            className="dislikes-button"                    
         >
            <FaRegThumbsDown/>&nbsp;{postDislikes}
         </button>
      </>
   );
}

export default LikesPressed;