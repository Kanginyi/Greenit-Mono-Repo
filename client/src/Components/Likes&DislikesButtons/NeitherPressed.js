import React from "react";

import {FaRegThumbsUp, FaRegThumbsDown} from "react-icons/fa";

function NeitherPressed({id, postLikes, setPostLikes, postDislikes, setPostDislikes, handlePostLikes, handlePostDislikes, isClicked, setIsClicked, loginError, setLoginError}) {
   return (
      <>
         <button
            onClick={() => handlePostLikes(id, setPostLikes, setPostDislikes, isClicked, setIsClicked, setLoginError)}
            className="likes-button"
         >
            <FaRegThumbsUp/>&nbsp;{postLikes}
         </button>

         <div className="error-message">{loginError}</div>

         <button
            onClick={() => handlePostDislikes(id, setPostLikes, setPostDislikes, isClicked, setIsClicked, setLoginError)}
            className="dislikes-button"
         >
            <FaRegThumbsDown/>&nbsp;{postDislikes}
         </button>
      </>
   );
}

export default NeitherPressed;