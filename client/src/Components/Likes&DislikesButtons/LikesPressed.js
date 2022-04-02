import React from "react";

import {FaThumbsUp, FaRegThumbsDown} from "react-icons/fa";

function LikesPressed({id, postLikes, setPostLikes, postDislikes, setPostDislikes, handleUnlikePost, handlePostDislikes, clickedNum, setClickedNum}) {
   return (
      <>
         <button
            onClick={() => handleUnlikePost(id, setPostLikes, setClickedNum)}
            className="likes-pressed"
         >
            <FaThumbsUp/>&nbsp;{postLikes}
         </button>

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