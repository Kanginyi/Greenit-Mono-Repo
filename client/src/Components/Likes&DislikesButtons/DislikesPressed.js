import React from "react";

import {FaRegThumbsUp, FaThumbsDown} from "react-icons/fa";

function DislikesPressed({id, blogLikes, setBlogLikes, blogDislikes, setBlogDislikes, handleBlogLikes, handleUndislikeBlog, clickedNum, setClickedNum}) {
   return (
      <>
         {/* Anonymous function to trigger handleBlogLikes when button is clicked. Pass in the required parameters to handle liking blogs through handleBlogLikes in App.js */}
         <button
            onClick={() => handleBlogLikes(id, setBlogLikes, setBlogDislikes, clickedNum, setClickedNum)}
            className="likes-button"
         >
            <FaRegThumbsUp/>&nbsp;{blogLikes}
         </button>

         {/* Anonymous function to trigger handleUndislikeBlog when button is clicked. Pass in the required parameters to handle undisliking blogs through handleUndislikeBlog in App.js */}
         <button
            onClick={() => handleUndislikeBlog(id, setBlogDislikes, setClickedNum)}
            className="dislikes-pressed"                    
         >
            <FaThumbsDown/>&nbsp;{blogDislikes}
         </button>
      </>
   );
}

export default DislikesPressed;