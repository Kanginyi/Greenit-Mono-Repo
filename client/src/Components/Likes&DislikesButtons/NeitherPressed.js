import React from "react";

import {FaRegThumbsUp, FaRegThumbsDown} from "react-icons/fa";

function NeitherPressed({id, postLikes, setPostLikes, postDislikes, setPostDislikes, handlePostLikes, handlePostDislikes, clickedNum, setClickedNum, loginError, setLoginError}) {
   return (
      <>
         {/* Anonymous function to trigger handlePostLikes when button is clicked. Pass in the required parameters to handle liking posts through handlePostLikes in App.js */}
         <button
            onClick={() => handlePostLikes(id, setPostLikes, setPostDislikes, clickedNum, setClickedNum, setLoginError)}
            className="likes-button"
         >
            <FaRegThumbsUp/>&nbsp;{postLikes}
         </button>

         <div className="error-message">{loginError}</div>

         {/* Anonymous function to trigger handlePostDislikes when button is clicked. Pass in the required parameters to handle disliking posts through handlePostDislikes in App.js */}  
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