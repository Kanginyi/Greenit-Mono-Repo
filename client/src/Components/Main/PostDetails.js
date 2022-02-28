import React, {useState, useEffect} from 'react';
import Comment from "./Comment";
import Loader from "./Loader";
import {useNavigate, useParams} from "react-router-dom";

import {BsTrash} from "react-icons/bs";

function PostDetails({currentUser, userData, postData, setPostData, commentData, setCommentData, searchValue, handleDelete}) {
   const URL = window.location.href;
   const clickedID = parseInt(useParams().id);

   const [isLoaded, setIsLoaded] = useState(false);

   const blogsArray = postData?.filter(blog => blog?.id === clickedID);
   
   const currentBlogInfo = (blogsArray?.filter(blog => blog?.id === clickedID))[0];

   // const currentBlogInfo = (postData?.filter(blog => URL.endsWith(blog?.id)))[0];

   const postAuthor = currentBlogInfo?.user?.username;

   let navigate = useNavigate();

   // Issue here with blogInfo, so that we can get username from it and not have it fuck everything up
   useEffect(() => {
      fetch(`/blogs/${currentBlogInfo?.id}`)
         .then(resp => resp.json())
         .then(blog => {
            setIsLoaded(() => true);
         });
   }, []);

   const filteredComments = commentData?.filter(comment => comment?.blog?.id === currentBlogInfo?.id);

   // Date & Time for the post header
   const postDate = new Date(currentBlogInfo?.created_at).toLocaleDateString();
   const postTime = new Date(currentBlogInfo?.created_at).toLocaleTimeString();

   // Render all comments onto the page
   const displayComments = filteredComments?.map(comment => {
      return <Comment key={comment.id} comment={comment} userData={userData}/>
   });

   console.log(searchValue)

   const filterComments = searchValue === "" ? displayComments : displayComments?.filter(comment => comment?.props?.comment?.user?.username?.toLowerCase()?.includes(searchValue?.toLowerCase()));

   // Likes and Dislikes states
   const [isClicked, setIsClicked] = useState(1);
   const [postLikes, setPostLikes] = useState(currentBlogInfo?.likes);
   const [postDislikes, setPostDislikes] = useState(currentBlogInfo?.dislikes);
   const [likesError, setLikesError] = useState("");

   // Likes and Dislikes handling functions
   const handleLikes = () => {
      if (currentUser) {
         fetch(`/inc_likes/${currentBlogInfo?.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"}
         })
            .then(resp => resp.json())
            .then(data => setPostLikes(data?.likes));

      if (isClicked === 3) {
         fetch(`/dec_dislikes/${currentBlogInfo?.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"}
         })
            .then(resp => resp.json())
            .then(data => setPostDislikes(data?.dislikes));
      }
         setIsClicked(2);
      } else {
         setLikesError("Please login");
      }
   }

   const handleDislikes = () => {
      if (currentUser) {
         fetch(`/inc_dislikes/${currentBlogInfo?.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"}
         })
            .then(resp => resp.json())
            .then(data => setPostDislikes(data?.dislikes));

         if (isClicked === 2) {
            fetch(`/dec_likes/${currentBlogInfo?.id}`, {
               method: "PATCH",
               headers: {"Content-Type": "application/json"}
            })
               .then(resp => resp.json())
               .then(data => setPostLikes(data?.likes));
         }
            setIsClicked(3);
      } else {
         setLikesError("Please login");
      }
   }

   // Three states of the buttons
   const notPressed = <>
                        <button
                           className="likes-button"
                           onClick={handleLikes}
                        >
                           👍 {currentBlogInfo ? currentBlogInfo?.likes : null}
                        </button>

                        <div className="error-message">{likesError}</div>

                        <button
                           className="dislikes-button"
                           onClick={handleDislikes}                      
                        >
                            👎 {currentBlogInfo ? currentBlogInfo?.dislikes : null}
                        </button>
                      </>

   const likesPressed = <>
                        <button
                           className="likes-pressed"
                           disabled="disabled"
                           onClick={handleLikes}
                        >
                           👍 {postLikes}
                        </button>

                        <button
                           className="dislikes-button"
                           onClick={handleDislikes}                     
                        >
                            👎 {currentBlogInfo ? currentBlogInfo?.dislikes : null}
                        </button>
                      </>

   const dislikesPressed = <>
                        <button
                           className="likes-button"
                           onClick={handleLikes}                      
                        >
                           👍 {currentBlogInfo ? currentBlogInfo?.likes : null}
                        </button>

                        <button
                           className="dislikes-pressed"
                           disabled="disabled"
                           onClick={handleDislikes}                    
                        >
                           👎 {postDislikes}
                        </button>
                      </>  

   // Handle Comment Input
   const [commentError, setCommentError] = useState("");
   const [postComment, setPostComment] = useState({
      comment_text: "", 
      user_id: currentUser?.id,
      blog_id: currentBlogInfo?.id
   });

   const handleComment = e => {
      setPostComment({
         ...postComment,
         user_id: currentUser?.id,
         blog_id: currentBlogInfo?.id,
         [e.target.name]:e.target.value
      })
   }

   const submitComment = e => {
      e.preventDefault();

      if (currentUser) {
         fetch("/comments", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(postComment)
         })
            .then(resp => {
               if (resp.ok) {
                  resp.json()
                     .then(data => {
                        setPostData(blogs => [...blogs, data]);
                        setCommentData(comments => [...comments, data]);
                     })
               }
            });
      } else {
         setCommentError("Please login");
      }
   };

   // Loading screen component
   if (!isLoaded) {
      return <Loader/>
   }
   
   return (
       <div className="post-div">

         <article className="single-post">
            <div className="user-info">
               <h3>
                  Posted by&nbsp;
                     <span
                        className="username-color"
                        onClick={() => navigate(`/users/${currentBlogInfo?.id}`)}
                        style={{cursor: "pointer"}}
                     >
                        u/{postAuthor}
                     </span> on {postDate} at {postTime}
               </h3>

               {currentUser?.username === postAuthor
                  ? <BsTrash onClick={() => handleDelete(currentBlogInfo?.id)} className="delete-post"/>
                  : null}
            </div>

            <div className="post-header">
                  <div className="likes-button-container">
                     {isClicked === 1 ? notPressed :
                     isClicked === 2 ? likesPressed :
                     dislikesPressed}
                  </div>
                  &nbsp;
               <h2 className="post-title">{currentBlogInfo?.title}</h2>
            </div>

            {
               currentBlogInfo?.image_url
               ? <img src={currentBlogInfo?.image_url} alt={currentBlogInfo?.title}/>
               : null
            }

            <div>
               <p>{currentBlogInfo?.blog_post}</p>
            </div>
         </article>

         <hr/>

         <details>
            <summary>JOIN THE CONVERSATION</summary>

            <form>
               <textarea
                  onChange={handleComment}
                  type="text"
                  name="comment_text"
                  value={postComment.comment_text}
                  required
                  rows="5"
                  cols="93"
               />

               <br/>
               <button onClick={submitComment}>Add Comment!</button>
               <div className="error-message">{commentError}</div>
            </form>
         </details>

      {filterComments}

      </div>
   );
}

export default PostDetails;