import React from 'react';
import {useNavigate} from "react-router-dom";

import {BsTrash} from "react-icons/bs";
import "../../Stylings/Comment.css";

function Comment({currentUser, comment, userData, commentData, setCommentData}) {
   let navigate = useNavigate();

   const commentUser = (userData?.filter(user => user?.id === comment?.user_id))[0];

   const commentDate = new Date(comment?.created_at).toLocaleDateString();
   const commentTime = new Date(comment?.created_at).toLocaleTimeString();

   const deleteComment = () => {
      fetch(`/comments/${comment?.id}`, {
         method: "DELETE"
      })
         .then(() => {
            const deleteComment = commentData?.filter(singleComment => singleComment?.id !== comment?.id);
            setCommentData(deleteComment);
         })
   }

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
               
               {currentUser?.username === commentUser?.username
                  ? <>
                     &nbsp;
                     <BsTrash onClick={deleteComment} className="delete-post"/>
                    </>
                  : null
               }
            </p>

            <p className="comment-username">
               -<span onClick={() => navigate(`/all_users/${commentUser?.id}`)} style={{cursor: "pointer"}}>
                  {commentUser?.username}
               </span>
            </p>
         </div>

      </div>
   );
}

export default Comment;