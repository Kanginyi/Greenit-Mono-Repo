import React from "react";

import {FaRegThumbsUp, FaRegThumbsDown} from "react-icons/fa";

function NeitherPressed({id, postLikes, setPostLikes, postDislikes, setPostDislikes, handlePostLikes, handlePostDislikes, clickedNum, setClickedNum, loginError, setLoginError}) {
   return (
      <>
         <button
            onClick={() => handlePostLikes(id, setPostLikes, setPostDislikes, clickedNum, setClickedNum, setLoginError)}
            className="likes-button"
         >
            <FaRegThumbsUp/>&nbsp;{postLikes}
         </button>

         <div className="error-message">{loginError}</div>

         <button
            onClick={() => handlePostDislikes(id, setPostLikes, setPostDislikes, clickedNum, setClickedNum, setLoginError)}
            className="dislikes-button"
         >
            <FaRegThumbsDown/>&nbsp;{postDislikes}
         </button>
      </>
   );
}

export default NeitherPressed;