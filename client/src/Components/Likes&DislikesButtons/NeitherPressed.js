import React from "react";

import {FaRegThumbsUp, FaRegThumbsDown} from "react-icons/fa";

function NeitherPressed({id, likes, setLikes, dislikes, setDislikes, likesFunction, dislikesFunction, clickedNum, setClickedNum, loginError, setLoginError}) {
   return (
      <>
         {/* Anonymous function to trigger likesFunction when button is clicked. Pass in the required parameters to handle liking blogs through likesFunction in App.js */}
         <button
            onClick={() => likesFunction(id, setLikes, setDislikes, clickedNum, setClickedNum, setLoginError)}
            className="likes-button"
         >
            <FaRegThumbsUp/>&nbsp;{likes}
         </button>

         <div className="error-message">{loginError}</div>

         {/* Anonymous function to trigger dislikesFunction when button is clicked. Pass in the required parameters to handle disliking blogs through dislikesFunction in App.js */}  
         <button
            onClick={() => dislikesFunction(id, setLikes, setDislikes, clickedNum, setClickedNum, setLoginError)}
            className="dislikes-button"
         >
            <FaRegThumbsDown/>&nbsp;{dislikes}
         </button>
      </>
   );
}

export default NeitherPressed;