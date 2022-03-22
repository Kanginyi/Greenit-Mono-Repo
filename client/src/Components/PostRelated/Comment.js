import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";

import {BsTrash} from "react-icons/bs";
import {FaEdit} from "react-icons/fa";
import "../../Stylings/Comment.css";

function Comment({currentUser, comment, userData, commentData, setCommentData}) {
   let navigate = useNavigate();

   const commentUser = (userData?.filter(user => user?.id === comment?.user_id))[0];

   const commentDate = new Date(comment?.created_at).toLocaleDateString();
   const commentTime = new Date(comment?.created_at).toLocaleTimeString();

   const [showCommentInput, setShowCommentInput] = useState(false);
   const [editComment, setEditComment] = useState({
      user_id: commentUser?.id,
      blog_id: comment?.blog?.id,
      comment_text: comment?.comment_text
   });

   const handleCommentEdit = e => {
      setEditComment({
         ...editComment,
         user_id: commentUser?.id,
         [e.target.name]:`EDIT: ${e.target.value}`
      });
   };

   const updateComment = () => {
      fetch(`/comments/${comment?.id}`, {
         method: "PATCH",
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify(editComment)
      })
         .then(resp => {
            if (resp.ok) {
               resp.json()
                  .then(updatedComment => {
                     setCommentData(commentData, updatedComment);
                     setShowCommentInput(false);
                  })
            }
         })
   };

   const deleteComment = () => {
      let checkDelete = window.confirm("Are you sure you want to delete your comment?");

      if (checkDelete) {
         fetch(`/comments/${comment?.id}`, {
            method: "DELETE"
         })
            .then(() => {
               const deleteComment = commentData?.filter(singleComment => singleComment?.id !== comment?.id);
               setCommentData(deleteComment);
            })
      }
   };

   return (
      <div className="comment-section">
         <div className="comment-text">
            {showCommentInput
               ? <div className="comment-text-edit">
                     Currently Editing:
                     <input
                        type="text"
                        name="comment_text"
                        onChange={handleCommentEdit}
                        defaultValue={editComment?.comment_text}
                        autoComplete="off"
                        spellCheck="false"
                        required
                     />

                     <button onClick={updateComment}>Edit Comment</button>
                  </div>
                : <p>{editComment?.comment_text}</p>
            }
         </div>

         <div className="comment-meta-data">
            <div className="comment-date-time">
               <em>
                  Posted on {commentDate} at {commentTime}
               </em>
               
               {currentUser?.username === commentUser?.username
                  ? <div className="comment-user-actions">
                        &nbsp;
                     <FaEdit
                        onClick={() => setShowCommentInput(prev => !prev)}
                        className="user-edit"
                        title="Edit Comment"
                     />

                     <BsTrash
                        onClick={deleteComment}
                        className="delete-button"
                        title="Delete Comment"
                     />
                    </div>
                  : null
               }
            </div>

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