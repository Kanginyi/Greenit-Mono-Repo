import React from 'react';
import {useNavigate} from "react-router-dom";

import "../../Stylings/Comment.css";

function Comment({comment, userData}) {
   let navigate = useNavigate();

   const commentUser = (userData?.filter(user => user?.id === comment?.user_id))[0];

   const commentDate = new Date(comment?.created_at).toLocaleDateString();
   const commentTime = new Date(comment?.created_at).toLocaleTimeString();

   return (
      <div className="comment-section">
         <div className="comment-text">
            <p>{comment?.comment_text}</p>
         </div>

         <div className="comment-meta-data">
            <p className="comment-date-time">
               <em>
                  Posted on {commentDate} at {commentTime}
               </em>
            </p>

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