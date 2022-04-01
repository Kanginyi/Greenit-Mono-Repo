import React, {useState, useEffect} from 'react';
import Comment from "./Comment";
import Loader from "../Helpers/Loader";
import ErrorPage from "../Helpers/ErrorPage";
import {useNavigate, useParams} from "react-router-dom";

import {BsTrash} from "react-icons/bs";
import {FaEdit, FaRegThumbsUp, FaRegThumbsDown, FaThumbsUp, FaThumbsDown} from "react-icons/fa";

function PostDetails({currentUser, commentData, setCommentData, searchValue, handleDelete}) {
   const [currentBlogInfo, setCurrentBlogInfo] = useState({});
   const [currentBlogComments, setCurrentBlogComments] = useState([]);
   const [isLoaded, setIsLoaded] = useState(false);

   // Blog Post ID
   const clickedID = parseInt(useParams().id);

   const postAuthor = currentBlogInfo?.user?.username;

   let navigate = useNavigate();

   useEffect(() => {
      fetch(`/blogs/${clickedID}`)
         .then(resp => resp.json())
         .then(blog => {
            setCurrentBlogInfo(blog);
            setCurrentBlogComments(blog?.comments);
            setIsLoaded(true);
         });
   }, [clickedID]);

   // Date & Time for the post header
   const postDate = new Date(currentBlogInfo?.created_at).toLocaleDateString();
   const postTime = new Date(currentBlogInfo?.created_at).toLocaleTimeString();

   // Render all comments onto the page
   const renderComments = currentBlogComments?.map(comment => {
      return <Comment key={comment.id} currentUser={currentUser} comment={comment} commentData={commentData} setCommentData={setCommentData} currentBlogComments={currentBlogComments} setCurrentBlogComments={setCurrentBlogComments}/>
   });

   const sortComments = renderComments?.sort((a, b) => a?.props?.comment?.created_at?.localeCompare(b?.props?.comment?.created_at));

   const filterComments = searchValue === "" ? sortComments : sortComments?.filter(comment => comment?.props?.comment?.user?.username?.toLowerCase()?.includes(searchValue?.toLowerCase()));

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
            .then(data => {
               setPostLikes(data?.likes);
            });

      if (isClicked === 3) {
         fetch(`/dec_dislikes/${currentBlogInfo?.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"}
         })
            .then(resp => resp.json())
            .then(data => {
               setPostDislikes(data?.dislikes);
            });
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
            .then(data => {
               setPostDislikes(data?.dislikes);
            });

      if (isClicked === 2) {
         fetch(`/dec_likes/${currentBlogInfo?.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"}
         })
            .then(resp => resp.json())
            .then(data => {
               setPostLikes(data?.likes);
            });
      }
         setIsClicked(3);
      } else {
         setLikesError("Please login");
      }
   }

   const handleUnlike = () => {
      if (currentUser) {
         fetch(`/dec_likes/${currentBlogInfo?.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"}
         })
            .then(resp => resp.json())
            .then(data => {
               setPostLikes(data?.likes);
            });
      }
      setIsClicked(1);
   }

   const handleUndislike = () => {
      if (currentUser) {
         fetch(`/dec_dislikes/${currentBlogInfo?.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"}
         })
            .then(resp => resp.json())
            .then(data => {
               setPostDislikes(data?.dislikes);
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
                           <FaRegThumbsUp/>&nbsp;{currentBlogInfo ? currentBlogInfo?.likes : null}
                        </button>

                        <div className="error-message">{likesError}</div>

                        <button
                           className="dislikes-button"
                           onClick={handleDislikes}                      
                        >
                            <FaRegThumbsDown/>&nbsp;{currentBlogInfo ? currentBlogInfo?.dislikes : null}
                        </button>
                      </>

   const likesPressed = <>
                        <button
                           className="likes-pressed"
                           onClick={handleUnlike}
                        >
                           <FaThumbsUp/>&nbsp;{postLikes}
                        </button>

                        <button
                           className="dislikes-button"
                           onClick={handleDislikes}                     
                        >
                            <FaRegThumbsDown/>&nbsp;{currentBlogInfo ? currentBlogInfo?.dislikes : null}
                        </button>
                      </>

   const dislikesPressed = <>
                        <button
                           className="likes-button"
                           onClick={handleLikes}                      
                        >
                           <FaRegThumbsUp/>&nbsp;{currentBlogInfo ? currentBlogInfo?.likes : null}
                        </button>

                        <button
                           className="dislikes-pressed"
                           onClick={handleUndislike}                    
                        >
                           <FaThumbsDown/>&nbsp;{postDislikes}
                        </button>
                      </>  

   // Handle Comment Input
   const [commentError, setCommentError] = useState("");
   const [postComment, setPostComment] = useState({
      comment_text: "", 
      user_id: currentUser?.id,
      blog_id: currentBlogInfo?.id,
      likes: 0,
      dislikes: 0
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
                        setCurrentBlogComments(comments => [...comments, data]);
                        setCommentData([...commentData, data]);
                     })
               }
            });
      } else {
         setCommentError("Please login");
      }
      
      setPostComment({
         comment_text: "",
         user_id: currentUser?.id,
         blog_id: currentBlogInfo?.id,
         likes: 0,
         dislikes: 0
      });
   };

   // State for hiding comments
   const [hideComments, setHideComments] = useState(false);

   // Loading screen component
   if (!isLoaded) {
      return <Loader/>
   }
   
   return (
      <>
      {!currentBlogInfo.errors
         ?
            <div className="post-div">

               <article className="single-post">
                  <div className="user-info">
                     <h3>
                        Posted by&nbsp;
                           <span
                              className="username-color"
                              onClick={() => navigate(`/all_users/${currentBlogInfo?.user?.id}`)}
                              style={{cursor: "pointer"}}
                           >
                              u/{postAuthor}
                           </span> on {postDate} at {postTime}
                     </h3>
         
                     {currentUser?.username === postAuthor
                        ? <BsTrash onClick={() => handleDelete(currentBlogInfo?.id)} className="delete-button" title="Delete Post"/>
                        : null}
                  </div>

                  {currentUser?.username === postAuthor
                     ? <div className="edit-post-container">
                           <div onClick={() => navigate(`/editing/${currentBlogInfo?.id}`)} className="edit-post">
                              <FaEdit/> Edit Post
                           </div>
                     </div>
                     : null
                  }

                  <div className="post-header">
                        <div className="likes-button-container">
                           {isClicked === 1 ? notPressed :
                           isClicked === 2 ? likesPressed :
                           dislikesPressed}
                        </div>
                        &nbsp;
                     <h2 className="post-title">{currentBlogInfo?.title}</h2>
                  </div>

                  <div className="post-info-underline"></div>

                  {
                     currentBlogInfo?.image_url
                     ? <img src={currentBlogInfo?.image_url} alt={currentBlogInfo?.title}/>
                     : null
                  }

                  <div className="post-content-container">
                     <p>{currentBlogInfo?.blog_post}</p>
                  </div>
               </article>

               <details>
                  <summary className="post-comment-dropdown">JOIN THE CONVERSATION</summary>

                  <form className="post-comment-form">
                     <textarea
                        onChange={handleComment}
                        type="text"
                        name="comment_text"
                        value={postComment.comment_text}
                        rows="5"
                     />

                     <br/>
                     <button onClick={submitComment}>Add Comment!</button>
                     <div className="error-message">{commentError}</div>
                     <br/>
                  </form>
               </details>

               {filterComments?.length
                  ?  <div className="show-hide-container">
                        <button onClick={() => setHideComments(prev => !prev)}>
                           {hideComments ? "Show Comments" : "Hide Comments"}
                        </button>
                     </div>
                  : null
               }

               {hideComments ? null : filterComments}
               
            </div>
         :
            <ErrorPage/>
      }
      </>
   );
}

export default PostDetails;