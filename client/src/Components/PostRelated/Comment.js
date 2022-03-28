import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";

import {BsTrash} from "react-icons/bs";
import {FaEdit, FaRegThumbsUp, FaRegThumbsDown, FaThumbsUp, FaThumbsDown} from "react-icons/fa";
import "../../Stylings/Comment.css";

function Comment({currentUser, comment, userData, commentData, setCommentData}) {
   let navigate = useNavigate();

   const commentUser = (userData?.filter(user => user?.id === comment?.user?.id))[0];

   const commentDate = new Date(comment?.created_at).toLocaleDateString();
   const commentTime = new Date(comment?.created_at).toLocaleTimeString();

   const [showCommentInput, setShowCommentInput] = useState(false);
   const [editComment, setEditComment] = useState({
      ...comment
      // user_id: commentUser?.id,
      // blog_id: comment?.blog?.id,
      // comment_text: comment?.comment_text,
      // likes: comment?.likes,
      // dislikes: comment?.dislikes
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

   const [isClicked, setIsClicked] = useState(1);
   const [commentLikes, setCommentLikes] = useState(editComment?.likes);
   const [commentDislikes, setCommentDislikes] = useState(editComment?.dislikes);
   const [commentError, setCommentError] = useState("");

   // Likes and Dislikes handling functions
   const handleLikes = () => {
      if (currentUser) {
         fetch(`/inc_comment_likes/${comment?.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"}
         })
            .then(resp => resp.json())
            .then(data => {
               setCommentLikes(data.likes);
            });

      if (isClicked === 3) {
         fetch(`/dec_comment_dislikes/${comment?.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"}
         })
            .then(resp => resp.json())
            .then(data => {
               setCommentDislikes(data.dislikes);
            });
      }
         setIsClicked(2);
      } else {
         setCommentError("Please login");
      }
   }

   const handleDislikes = () => {
      if (currentUser) {
         fetch(`/inc_comment_dislikes/${comment?.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"}
         })
            .then(resp => resp.json())
            .then(data => {
               setCommentDislikes(data.dislikes);
            });

         if (isClicked === 2) {
            fetch(`/dec_comment_likes/${comment?.id}`, {
               method: "PATCH",
               headers: {"Content-Type": "application/json"}
            })
               .then(resp => resp.json())
               .then(data => {
                  setCommentLikes(data.likes);
               });
         }
            setIsClicked(3);
      } else {
         setCommentError("Please login");
      }
   }

   const handleUnlike = () => {
      if (currentUser) {
         fetch(`/dec_comment_likes/${comment?.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"}
         })
            .then(resp => resp.json())
            .then(data => {
               setCommentLikes(data?.likes);
            });
      }
      setIsClicked(1);
   }

   const handleUndislike = () => {
      if (currentUser) {
         fetch(`/dec_comment_dislikes/${comment?.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"}
         })
            .then(resp => resp.json())
            .then(data => {
               setCommentDislikes(data?.dislikes);
            });
      }
      setIsClicked(1);
   }

   // Three states of the buttons
   const notPressed = <>
                        <button
                           className="likes-button"
                           onClick={handleLikes}
                        >
                           <FaRegThumbsUp/>&nbsp;{commentLikes}
                        </button>

                        <div className="error-message">{commentError}</div>
                        
                        <button
                           className="dislikes-button"
                           onClick={handleDislikes}                      
                        >
                            <FaRegThumbsDown/>&nbsp;{commentDislikes}
                        </button>
                      </>

   const likesPressed = <>
                        <button
                           className="likes-pressed"
                           onClick={handleUnlike}
                        >
                           <FaThumbsUp/>&nbsp;{commentLikes}
                        </button>

                        <button
                           className="dislikes-button"
                           onClick={handleDislikes}                     
                        >
                            <FaRegThumbsDown/>&nbsp;{commentDislikes}
                        </button>
                      </>

   const dislikesPressed = <>
                        <button
                           className="likes-button"
                           onClick={handleLikes}                      
                        >
                           <FaRegThumbsUp/>&nbsp;{commentLikes} 
                        </button>

                        <button
                           className="dislikes-pressed"
                           onClick={handleUndislike}                    
                        >
                           <FaThumbsDown/>&nbsp;{commentDislikes}
                        </button>
                      </>

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

         <div className="comment-information">
            <div className="comment-likes-container">
               {isClicked === 1 ? notPressed :
               isClicked === 2 ? likesPressed :
               dislikesPressed}
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

      </div>
   );
}

export default Comment;