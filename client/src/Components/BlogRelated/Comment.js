import React, {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import DislikesPressed from "../Likes&DislikesButtons/DislikesPressed";
import LikesPressed from "../Likes&DislikesButtons/LikesPressed";
import NeitherPressed from "../Likes&DislikesButtons/NeitherPressed";

import "../../Stylings/Comment.css";

import {BsTrash} from "react-icons/bs";
import {FaEdit} from "react-icons/fa";

function Comment({currentUser, comment, commentData, setCommentData, currentBlogComments, setCurrentBlogComments}) {
   let navigate = useNavigate();

   const commentUser = comment?.user;

   // Date & Time information for when the comment was created/posted
   const commentDate = new Date(comment?.created_at).toLocaleDateString();
   const commentTime = new Date(comment?.created_at).toLocaleTimeString();

   const [showCommentInput, setShowCommentInput] = useState(false);
   const [editComment, setEditComment] = useState({
      ...comment
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

               const deleteBlogComment = currentBlogComments?.filter(singleComment => singleComment?.id !== comment?.id);
               setCurrentBlogComments(deleteBlogComment);
            })
      }
   };

   const [clickedNum, setClickedNum] = useState(1);
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
               setEditComment({...editComment, likes: data.likes});
            });

      if (clickedNum === 3) {
         fetch(`/dec_comment_dislikes/${comment?.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"}
         })
            .then(resp => resp.json())
            .then(data => {
               setCommentDislikes(data.dislikes);
               setEditComment({...editComment, dislikes: data.dislikes});
            });
      }
         setClickedNum(2);
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
               setEditComment({...editComment, dislikes: data.dislikes});
            });

         if (clickedNum === 2) {
            fetch(`/dec_comment_likes/${comment?.id}`, {
               method: "PATCH",
               headers: {"Content-Type": "application/json"}
            })
               .then(resp => resp.json())
               .then(data => {
                  setCommentLikes(data.likes);
                  setEditComment({...editComment, likes: data.likes});
               });
         }
            setClickedNum(3);
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
               setEditComment({...editComment, likes: data.likes});
            });
      }
      setClickedNum(1);
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
               setEditComment({...editComment, dislikes: data.dislikes});
            });
      }
      setClickedNum(1);
   }

   // Close commentInput using the "Escape" key
   const escPress = useCallback(e => {
      if (e.key === "Escape" && showCommentInput) {
         setShowCommentInput(false);
      }
   }, [showCommentInput, setShowCommentInput]);

   useEffect(() => {
      document.addEventListener("keydown", escPress);
      return () => document.removeEventListener("keydown", escPress);
   }, [escPress]);

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
               {clickedNum === 1
                  ? <NeitherPressed
                        id={comment?.id}
                        likes={commentLikes}
                        setLikes={setCommentLikes}
                        dislikes={commentDislikes}
                        setDislikes={setCommentDislikes}
                        likesFunction={handleLikes}
                        dislikesFunction={handleDislikes}
                        clickedNum={clickedNum}
                        setClickedNum={setClickedNum}
                        loginError={commentError}
                        setLoginError={setCommentError}
                    />
                  : clickedNum === 2
                     ? <LikesPressed
                           id={comment?.id}
                           likes={commentLikes}
                           setLikes={setCommentLikes}
                           dislikes={commentDislikes}
                           setDislikes={setCommentDislikes}
                           unlikeFunction={handleUnlike}
                           dislikesFunction={handleDislikes}
                           clickedNum={clickedNum}
                           setClickedNum={setClickedNum}
                       />
                     : <DislikesPressed
                           id={comment?.id}
                           likes={commentLikes}
                           setLikes={setCommentLikes}
                           dislikes={commentDislikes}
                           setDislikes={setCommentDislikes}
                           likesFunction={handleLikes}
                           undislikeFunction={handleUndislike}
                           clickedNum={clickedNum}
                           setClickedNum={setClickedNum}
                       />
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

      </div>
   );
}

export default Comment;