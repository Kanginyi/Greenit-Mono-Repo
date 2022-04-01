import React from "react";

import {FaRegThumbsUp, FaRegThumbsDown} from "react-icons/fa";

function NeitherPressed({id, likes, setLikes, dislikes, setDislikes, likesFunction, dislikesFunction, clickedNum, setClickedNum, errorMessage, setErrorMessage}) {
   return (
      <>
         <button
            onClick={() => likesFunction(id, setLikes, setDislikes, clickedNum, setClickedNum, setErrorMessage)}
            className="likes-button"
         >
            <FaRegThumbsUp/>&nbsp;{likes}
         </button>

         <div className="error-message">{errorMessage}</div>

         <button
            onClick={() => dislikesFunction(id, setLikes, setDislikes, clickedNum, setClickedNum, setErrorMessage)}
            className="dislikes-button"
         >
            <FaRegThumbsDown/>&nbsp;{dislikes}
         </button>
      </>
   );
}

export default NeitherPressed;