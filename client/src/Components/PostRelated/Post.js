import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

import "../../Stylings/Post.css";

import {BsTrash} from "react-icons/bs";
import {FaRegThumbsUp, FaRegThumbsDown, FaThumbsUp, FaThumbsDown} from "react-icons/fa";

function Post({currentUser, post, userData, handleDelete}) {
   const userObj = userData?.filter(user => user?.id === post?.user?.id);

   let navigate = useNavigate();

   const clickUser = () => {
      navigate(`/all_users/${userObj[0]?.id}`);
   }

   const postID = post?.id;

   const viewMore = () => {
      navigate(`/blogs/${postID}`);
   }

   const [isClicked, setIsClicked] = useState(1);
   const [postLikes, setPostLikes] = useState(post?.likes);
   const [postDislikes, setPostDislikes] = useState(post?.dislikes);
   const [likesError, setLikesError] = useState("");

   // Likes and Dislikes handling functions
   const handleLikes = () => {
      if (currentUser) {
         fetch(`/inc_likes/${postID}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"}
         })
            .then(resp => resp.json())
            .then(data => {
               setPostLikes(data?.likes);
            });

      if (isClicked === 3) {
         fetch(`/dec_dislikes/${postID}`, {
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
         fetch(`/inc_dislikes/${postID}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"}
         })
            .then(resp => resp.json())
            .then(data => {
               setPostDislikes(data?.dislikes);
            });

         if (isClicked === 2) {
            fetch(`/dec_likes/${postID}`, {
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
         fetch(`/dec_likes/${postID}`, {
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
         fetch(`/dec_dislikes/${postID}`, {
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
                           <FaRegThumbsUp/>&nbsp;{postLikes}
                        </button>

                        <div className="error-message">{likesError}</div>
                        
                        <button
                           className="dislikes-button"
                           onClick={handleDislikes}                      
                        >
                            <FaRegThumbsDown/>&nbsp;{postDislikes}
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
                            <FaRegThumbsDown/>&nbsp;{postDislikes}
                        </button>
                      </>

   const dislikesPressed = <>
                        <button
                           className="likes-button"
                           onClick={handleLikes}                      
                        >
                           <FaRegThumbsUp/>&nbsp;{postLikes} 
                        </button>

                        <button
                           className="dislikes-pressed"
                           onClick={handleUndislike}                    
                        >
                           <FaThumbsDown/>&nbsp;{postDislikes}
                        </button>
                      </>

   if (postLikes > 99999) {
      setPostLikes("99999+");
   }

   if (postDislikes > 99999) {
      setPostDislikes("99999+");
   }

   // Add ... after posts with more than 100 characters in length
   let renderOnMainPage;
   if (post?.blog_post?.length > 100) {
      renderOnMainPage = post?.blog_post?.slice(0, 100) + "...";
   } else {
      renderOnMainPage = post?.blog_post;
   }

   const postDate = new Date(post.created_at).toLocaleDateString();
   const postTime = new Date(post.created_at).toLocaleTimeString();
   
   return (
      <div className="post-div">
         
         <article className="single-post">
            <div className="user-info">
               <h3>
                  Posted by&nbsp;
                     <span
                        className="username-color"
                        onClick={clickUser}
                        style={{cursor: "pointer"}}
                     >
                        u/{userObj[0]?.username}
                     </span> on {postDate} at {postTime}
               </h3>

               {currentUser?.username === userObj[0]?.username
                  ? <BsTrash onClick={() => handleDelete(post.id)} className="delete-button" title="Delete Post"/>
                  : null}
            </div>

            <div className="post-header">
               <div className="likes-button-container">
                  {isClicked === 1 ? notPressed :
                  isClicked === 2 ? likesPressed :
                  dislikesPressed}
               </div>
                     &nbsp;
               <h2 className="post-title">{post.title}</h2>
            </div>

            <div className="post-info-underline"></div>

            {post.image_url ? <img src={post.image_url} alt={post.title}/> : null}

            <p>
               {renderOnMainPage}
            </p>
         </article>

         <div className="view-more-container">
            <em>
               {post?.comments?.length === 1
                  ? `${post?.comments?.length} Total Comment`
                  : `${post?.comments?.length} Total Comments`
               }
            </em>
               <br/>
            <button onClick={viewMore} className="post-view-more">
               VIEW MORE
            </button>
         </div>
      
      </div>
   );
}

export default Post;