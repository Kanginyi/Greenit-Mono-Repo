import React, {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import DislikesPressed from "../Likes&DislikesButtons/DislikesPressed";
import LikesPressed from "../Likes&DislikesButtons/LikesPressed";
import NeitherPressed from "../Likes&DislikesButtons/NeitherPressed";

import {useSelector} from "react-redux";

import "../../Stylings/Comment.css";

import {BsTrash} from "react-icons/bs";
import {FaEdit} from "react-icons/fa";

function Comment({comment, commentData, setCommentData, currentBlogComments, setCurrentBlogComments}) {
   let navigate = useNavigate();

   // State to handle current user's information
   const currentUser = useSelector(state => state.currentUser.value);
   
   // State to handle whether to show the comment editing input or not
   const [showCommentEditInput, setShowCommentEditInput] = useState(false);
   // State to handle the edited comment's information; set the initial value to the spread out comment object
   const [editComment, setEditComment] = useState({
      ...comment
   });

   // State to handle whether a comment has been liked or disliked
   const [clickedNum, setClickedNum] = useState(1);
   // State to handle comment's likes & dislikes
   const [commentLikes, setCommentLikes] = useState(editComment?.likes);
   const [commentDislikes, setCommentDislikes] = useState(editComment?.dislikes);
   // State to handle whether "Please login" is shown or not
   const [commentError, setCommentError] = useState("");

   const commentUser = comment?.user;

   // Date & Time information for when the comment was created/posted
   const commentDate = new Date(comment?.created_at).toLocaleDateString();
   const commentTime = new Date(comment?.created_at).toLocaleTimeString();

   // Function to navigate to comment user's profile when user clicks related username
   const viewUserInfo = () => {
      navigate(`/all_users/${commentUser?.id}`);
   };

   // Function to update editComment state based on inputted values from showCommentEdit's input
   const handleCommentEdit = e => {
      setEditComment({
         ...editComment,
         user_id: commentUser?.id,
         [e.target.name]:`EDIT: ${e.target.value}`
      });
   };

   // Function to update the relevant comment using comment's id and the information inside of the editComment object
   // After the response comes back okay, setCommentData array to include the updatedComment object, and hide the comment editing input
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
                     setShowCommentEditInput(false);
                  })
            }
         })
   };

   // Close comment editing input using the "Escape" key
   const escPress = useCallback(e => {
      if (e.key === "Escape" && showCommentEditInput) {
         setShowCommentEditInput(false);
      }
   }, [showCommentEditInput, setShowCommentEditInput]);

   useEffect(() => {
      document.addEventListener("keydown", escPress);
      return () => document.removeEventListener("keydown", escPress);
   }, [escPress]);

   // Function to handle deleting comments using the id of the deleted comment
   const deleteComment = () => {
      let confirmDelete = window.confirm("Are you sure you want to delete your comment?");

      // If confirmDelete returns true (because a user clicked confirm), then continue with delete actions
      if (confirmDelete) {
         fetch(`/comments/${comment?.id}`, {
            method: "DELETE"
         })
            .then(() => {
               // deleteComment variable to hold array that removes the deleted comment from commentData and setCommentData to that new array
               const deleteComment = commentData?.filter(eachComment => eachComment?.id !== comment?.id);
               setCommentData(deleteComment);

               // deleteBlogComment variable to hold array that removes the deleted comment from the current blog's comments array and setCurrentBlogComments to that new array
               const deleteBlogComment = currentBlogComments?.filter(eachComment => eachComment?.id !== comment?.id);
               setCurrentBlogComments(deleteBlogComment);
            })
      }
   };

   // Function to handle liking comments using the id of the liked comment
   // If a user is already logged in (the currentUser object exists), then increment likes by 1, setCommentLikes to the updated number, and also setEditComment to the updated number to update the editComment object's likes
   // If clickedNum state is 3 (where dislikes button is pressed), then also decrement dislikes by 1, setCommentDislikes to the updated number, and also setEditComment to the updated number to update the editComment object's dislikes
   // setClickedNum to 2 (where likes button is pressed)
   // If a user isn't logged in (the currentUser object doesn't exist), then set and render "Please login"
   const handleCommentLikes = () => {
      if (currentUser) {
         fetch(`/inc_comment_likes/${comment?.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"}
         })
            .then(resp => resp.json())
            .then(data => {
               setCommentLikes(data?.likes);
               setEditComment({...editComment, likes: data?.likes});
            })
         
         if (clickedNum === 3) {
            fetch(`/dec_comment_dislikes/${comment?.id}`, {
               method: "PATCH",
               headers: {"Content-Type": "application/json"}
            })
               .then(resp => resp.json())
               .then(data => {
                  setCommentDislikes(data?.dislikes);
                  setEditComment({...editComment, dislikes: data?.dislikes});
               });
         }
         setClickedNum(2);
      } else {
         setCommentError("Please login");
      }
   };

   // Function to handle disliking comments using the id of the disliked comment
   // If a user is already logged in (the currentUser object exists), then increment dislikes by 1, setCommentDislikes to the updated number, and also setEditComment to the updated number to update the editComment object's dislikes
   // If clickedNum state is 2 (where likes button is pressed), then also decrement likes by 1, setCommentLikes to the updated number, and also setEditComment to the updated number to update the editComment object's likes
   // setClickedNum to 3 (where dislikes button is pressed)
   // If a user isn't logged in (the currentUser object doesn't exist), then set and render "Please login"
   const handleCommentDislikes = () => {
      if (currentUser) {
         fetch(`/inc_comment_dislikes/${comment?.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"}
         })
            .then(resp => resp.json())
            .then(data => {
               setCommentDislikes(data?.dislikes);
               setEditComment({...editComment, dislikes: data?.dislikes});
            });

         if (clickedNum === 2) {
            fetch(`/dec_comment_likes/${comment?.id}`, {
               method: "PATCH",
               headers: {"Content-Type": "application/json"}
            })
               .then(resp => resp.json())
               .then(data => {
                  setCommentLikes(data?.likes);
                  setEditComment({...editComment, likes: data?.likes});
               });
         }
         setClickedNum(3);
      } else {
         setCommentError("Please login");
      }
   };

   // Function to handle unliking comments using the id of the unliked comment
   // If comment is already liked, decrement likes by 1, setCommentLikes to the updated number, and also setEditComment to the updated number to update the editComment object's likes
   // setClickedNum to 1 (where neither button is pressed)
   const handleUnlikeComment = () => {
      if (currentUser) {
         fetch(`/dec_comment_likes/${comment?.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"}
         })
            .then(resp => resp.json())
            .then(data => {
               setCommentLikes(data?.likes);
               setEditComment({...editComment, likes: data?.likes});
            });
      }
      setClickedNum(1);
   };

   // Function to handle undisliking comments using the id of the undisliked comment
   // If comment is already disliked, decrement dislikes by 1, setCommentDislikes to the updated number, and also setEditComment to the updated number to update the editComment object's dislikes
   // setClickedNum to 1 (where neither button is pressed)
   const handleUndislikeComment = () => {
      if (currentUser) {
         fetch(`/dec_comment_dislikes/${comment?.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"}
         })
            .then(resp => resp.json())
            .then(data => {
               setCommentDislikes(data?.dislikes);
               setEditComment({...editComment, dislikes: data?.dislikes});
            });
      }
      setClickedNum(1);
   };

   return (
      <div>
         <div className="comment-actions">
            {/* If currentUser's id is the same as the commentUser's id, give the user the option to edit the related comment */}
            {currentUser?.id === commentUser?.id &&
               <div className="comment-user-edit">
                  <FaEdit
                     onClick={() => setShowCommentEditInput(prev => !prev)}
                     className="user-edit"
                     title="Edit Comment"
                  />
               </div>
            }

            {/* If showCommentEditInput is true, then show input to let the user edit the relevant comment. */}
            <div className="comment-text">
               {showCommentEditInput
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

            {/* If currentUser's id is the same as the commentUser's id, give the user the option to delete the related comment */}
            {currentUser?.id === commentUser?.id &&
               <div className="comment-user-delete">
                  <BsTrash
                     onClick={deleteComment}
                     className="delete-button"
                     title="Delete Comment"
                  />
               </div>
            }
         </div>

         <div className="comment-information">
            <div className="comment-likes-container">
               {/* Based on clickedNum's value(1, 2, or 3), render the relevant component based on whether no buttons are pressed, the likes button is pressed, or the dislikes button is pressed.*/}
               {clickedNum === 1
                  ? <NeitherPressed
                        id={comment?.id}
                        likes={commentLikes}
                        setLikes={setCommentLikes}
                        dislikes={commentDislikes}
                        setDislikes={setCommentDislikes}
                        likesFunction={handleCommentLikes}
                        dislikesFunction={handleCommentDislikes}
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
                           unlikeFunction={handleUnlikeComment}
                           dislikesFunction={handleCommentDislikes}
                           clickedNum={clickedNum}
                           setClickedNum={setClickedNum}
                       />
                     : <DislikesPressed
                           id={comment?.id}
                           likes={commentLikes}
                           setLikes={setCommentLikes}
                           dislikes={commentDislikes}
                           setDislikes={setCommentDislikes}
                           likesFunction={handleCommentLikes}
                           undislikeFunction={handleUndislikeComment}
                           clickedNum={clickedNum}
                           setClickedNum={setClickedNum}
                       />
               }
            </div>

            <div className="comment-meta-data">
               <div className="comment-date-time">
                  <em>
                     Posted on&nbsp;
                     <time dateTime={`${commentDate} ${commentTime}`}>
                        {commentDate} at {commentTime}
                     </time>
                  </em>
               </div>

               <p className="comment-username">
                  -<span onClick={viewUserInfo} style={{cursor: "pointer"}}>
                     {commentUser?.username}
                  </span>
               </p>
            </div>
         </div>

      </div>
   );
}

export default Comment;