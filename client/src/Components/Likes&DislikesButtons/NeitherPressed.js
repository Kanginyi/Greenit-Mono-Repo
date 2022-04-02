import React from "react";

import {FaRegThumbsUp, FaRegThumbsDown} from "react-icons/fa";

function NeitherPressed({id, blogLikes, setBlogLikes, blogDislikes, setBlogDislikes, handleBlogLikes, handleBlogDislikes, clickedNum, setClickedNum, loginError, setLoginError}) {
   return (
      <>
         {/* Anonymous function to trigger handleBlogLikes when button is clicked. Pass in the required parameters to handle liking blogs through handleBlogLikes in App.js */}
         <button
            onClick={() => handleBlogLikes(id, setBlogLikes, setBlogDislikes, clickedNum, setClickedNum, setLoginError)}
            className="likes-button"
         >
            <FaRegThumbsUp/>&nbsp;{blogLikes}
         </button>

         <div className="error-message">{loginError}</div>

         {/* Anonymous function to trigger handleBlogDislikes when button is clicked. Pass in the required parameters to handle disliking blogs through handleBlogDislikes in App.js */}  
         <button
            onClick={() => handleBlogDislikes(id, setBlogLikes, setBlogDislikes, clickedNum, setClickedNum, setLoginError)}
            className="dislikes-button"
         >
            <FaRegThumbsDown/>&nbsp;{blogDislikes}
         </button>
      </>
   );
}

export default NeitherPressed;