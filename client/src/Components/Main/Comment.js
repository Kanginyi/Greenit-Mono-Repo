import React from 'react';
import {useNavigate} from "react-router-dom";

function Comment({comment, userData}) {
   let navigate = useNavigate();

   const commentUser = (userData?.filter(user => user?.id === comment?.user_id))[0];

   return (
      <div className="comment-section">
         <div className="comment-text-class">
            <h3>{comment?.comment_text}</h3>
         </div>

         <div>
            <h3 className="comment-username-class">
               -<span onClick={() => navigate(`/users/${commentUser?.id}`)} style={{cursor: "pointer"}}>
                  {commentUser?.username}
               </span>
            </h3>
         </div>

      </div>
   );
}

export default Comment;