import React from 'react';
import {useNavigate} from "react-router-dom";

import "../../Stylings/Comment.css";

function Comment({comment, userData}) {
   let navigate = useNavigate();

   const commentUser = (userData?.filter(user => user?.id === comment?.user_id))[0];

   return (
      <div className="comment-section">
         <div className="comment-text">
            <p>{comment?.comment_text}</p>
         </div>

         <div>
            <p className="comment-username">
               -<span onClick={() => navigate(`/users/${commentUser?.id}`)} style={{cursor: "pointer"}}>
                  {commentUser?.username}
               </span>
            </p>
         </div>

      </div>
   );
}

export default Comment;