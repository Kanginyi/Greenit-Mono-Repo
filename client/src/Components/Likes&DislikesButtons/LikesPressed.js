import React from "react";

import {FaThumbsUp, FaRegThumbsDown} from "react-icons/fa";

function LikesPressed({id, blogLikes, setBlogLikes, blogDislikes, setBlogDislikes, handleUnlikeBlog, handleBlogDislikes, clickedNum, setClickedNum}) {
   return (
      <>
         {/* Anonymous function to trigger handleUnlikeBlog when button is clicked. Pass in the required parameters to handle unliking blogs through handleUnlikeBlog in App.js */}
         <button
            onClick={() => handleUnlikeBlog(id, setBlogLikes, setClickedNum)}
            className="likes-pressed"
         >
            <FaThumbsUp/>&nbsp;{blogLikes}
         </button>

         {/* Anonymous function to trigger handleBlogDislikes when button is clicked. Pass in the required parameters to handle disliking blogs through handleBlogDislikes in App.js */}
         <button
            onClick={() => handleBlogDislikes(id, setBlogLikes, setBlogDislikes, clickedNum, setClickedNum)}
            className="dislikes-button"                    
         >
            <FaRegThumbsDown/>&nbsp;{blogDislikes}
         </button>
      </>
   );
}

export default LikesPressed;