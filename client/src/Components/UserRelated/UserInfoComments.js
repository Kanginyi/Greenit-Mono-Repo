import React from "react";
import {useNavigate} from "react-router-dom";

import {useSelector} from "react-redux";

import {BsTrash} from "react-icons/bs";
import {FaEdit} from "react-icons/fa";

function UserInfoComments({comment, commentData, setCommentData, currentUserInfo, userCommentsInfo, setUserCommentsInfo}) {
   let navigate = useNavigate();

   // State to handle current user's information
   const currentUser = useSelector(state => state.currentUser.value);

   // Date & Time information for when the comment was created/posted
   const commentDate = new Date(comment?.created_at).toLocaleDateString();
   const commentTime = new Date(comment?.created_at).toLocaleTimeString();

   // Function to handle deleting related user's comments using the id of the deleted comment
   const deleteUserComment = () => {
      let confirmDelete = window.confirm(`Are you sure you want to delete your comment on "${comment?.blog?.title}"?`);

      // If confirmDelete returns true (because a user clicked confirm), then continue with delete actions
      if (confirmDelete) {
         fetch(`/comments/${comment?.id}`, {
            method: "DELETE"
         })
            .then(() => {
               // deleteComment variable to hold array that removes the deleted comment from userCommentsInfo and setUserCommentsInfo to that new array
               const deleteComment = userCommentsInfo?.filter(eachComment => eachComment?.id !== comment?.id);
               setUserCommentsInfo(deleteComment);

               // removeComment variable to hold array that removes the deleted comment from commentData and setCommentData to that new array
               const removeComment = commentData?.filter(eachComment => eachComment?.id !== comment?.id);
               setCommentData(removeComment);
            })
      }
   };

   return (
      <div className="user-info-comments">
         <div
            onClick={() => navigate(`/blogs/${comment?.blog?.id}`)}
            className="user-comment-container"
         >
            <h4>{comment?.blog?.title}</h4>
            <em>{comment?.comment_text}</em>
            <p>
               {/* Proper grammar based on the amount of likes and dislikes on the comment */}
               {comment?.likes === 1 ? `${comment?.likes} Like` : `${comment?.likes} Likes`}
                  &nbsp;|&nbsp;
               {comment?.dislikes === 1 ? `${comment?.dislikes} Dislike` : `${comment?.dislikes} Dislikes`}                  
            </p>
            <p className="blog-comments-footer">
               <em>
                  Posted on&nbsp;
                  <time dateTime={`${commentDate} ${commentTime}`}>
                     {commentDate} at {commentTime}
                  </time>
               </em>
            </p>
         </div>

         {/* If the currentUser's id is the same as the currentUserInfo's id, give the user the options to delete or edit the blog */}
         {currentUser?.id === currentUserInfo?.id &&
            <div className="user-info-actions">
               <BsTrash
                  onClick={deleteUserComment}
                  className="delete-button cursor-pointer"
                  title={`Delete your comment on "${comment?.blog?.title}"`}
               />

               <FaEdit
                  onClick={() => navigate(`/blogs/${comment?.blog?.id}`)}
                  className="user-edit cursor-pointer"
                  title={`Head to "${comment?.blog?.title}" to edit your comment`}
               />
            </div>
         }
      </div>
   );
}

export default UserInfoComments;