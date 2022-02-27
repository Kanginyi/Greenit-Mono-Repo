import React, {useState, useEffect} from 'react';
import Loader from "./Loader";
import {useNavigate, useParams} from "react-router-dom";

import {BsTrash} from "react-icons/bs";

function PostDetails({currentUser, userData, handleDelete}) {
   const [blogInfo, setBlogInfo] = useState([]);
   const [isLoaded, setIsLoaded] = useState(false);
   const [comments, setComments] = useState([]);

   let navigate = useNavigate();
   const id = useParams().id;

   useEffect(() => {
      fetch(`/blogs/${id}`)
         .then(resp => resp.json())
         .then(blog => {
            setBlogInfo(blog)
            setIsLoaded(true)
         });
   }, [id]);

   useEffect(() => {
      fetch("/comments")
         .then(resp => resp.json())
         .then(data => setComments(data));
   }, []);

   // Date & Time for the post header
   const postDate = new Date(blogInfo?.created_at).toLocaleDateString();
   const postTime = new Date(blogInfo?.created_at).toLocaleTimeString();

   // Find all comments related to the post
   const findComments = comments?.filter(comment => comment?.blog?.id === blogInfo?.id);

   // User info
   const userObj = (userData?.filter(user => user?.id === blogInfo?.user?.id))[0];

   // Render all comments onto the page
   const displayComments = findComments?.map(foundComment => {
      const commentUser = (userData?.filter(user => user?.id === foundComment?.user?.id))[0];
     
      return (
         <div className="comment-section">

            <div className="comment-text-class">
               <h3>{foundComment?.comment_text}</h3>
            </div>

            <div>
               <h3 className="comment-username-class" style={{cursor: "pointer"}}>
                  -<span onClick={() => navigate(`/users/${commentUser?.id}`)}>{commentUser?.username}</span>
               </h3>
            </div>

         </div>
      );
   });

   const [isClicked, setIsClicked] = useState(1);
   const [postLikes, setPostLikes] = useState(null);
   const [postDislikes, setPostDislikes] = useState(null);
   const [likesError, setLikesError] = useState("");

   // Likes and Dislikes handling functions
   const handleLikes = () => {
      if (currentUser) {
         fetch(`/inc_likes/${id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"}
         })
            .then(resp => resp.json())
            .then(data => setPostLikes(data.likes));

      if (isClicked === 3) {
         fetch(`/dec_dislikes/${id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"}
         })
            .then(resp => resp.json())
            .then(data => setPostDislikes(data.dislikes));
      }
         setIsClicked(2);
      } else {
         setLikesError("Please login");
      }
   }

   const handleDislikes = () => {
      if (currentUser) {
         fetch(`/inc_dislikes/${id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"}
         })
            .then(resp => resp.json())
            .then(data => setPostDislikes(data.dislikes));

         if (isClicked === 2) {
            fetch(`/dec_likes/${id}`, {
               method: "PATCH",
               headers: {"Content-Type": "application/json"}
            })
               .then(resp => resp.json())
               .then(data => setPostLikes(data.likes));
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
                           👍 {blogInfo ? blogInfo?.likes : null}
                        </button>

                        <div className="error-message">{likesError}</div>

                        <button
                           className="dislikes-button"
                           onClick={handleDislikes}                      
                        >
                            👎 {blogInfo ? blogInfo?.dislikes : null}
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
                            👎 {blogInfo ? blogInfo?.dislikes : null}
                        </button>
                      </>

   const dislikesPressed = <>
                        <button
                           className="likes-button"
                           onClick={handleLikes}                      
                        >
                           👍 {blogInfo ? blogInfo?.likes : null}
                        </button>

                        <button
                           className="dislikes-pressed"
                           disabled="disabled"
                           onClick={handleDislikes}                    
                        >
                           👎 {postDislikes}
                        </button>
                      </>

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
                        onClick={() => navigate(`/users/${id}`)}
                        style={{cursor: "pointer"}}
                     >
                        u/{userObj?.username}
                     </span> on {postDate} at {postTime}
               </h3>

               {currentUser?.username === userObj.username
                  ? <BsTrash onClick={() => handleDelete(blogInfo?.id)} className="delete-post"/>
                  : null}
            </div>

            <div className="post-header">
                  <div className="likes-button-container">
                     {isClicked === 1 ? notPressed :
                     isClicked === 2 ? likesPressed :
                     dislikesPressed}
                  </div>
                  &nbsp;
               <h2 className="post-title">{blogInfo?.title}</h2>
            </div>

            {
               blogInfo?.image_url
               ? <img src={blogInfo?.image_url} alt={blogInfo?.title}/>
               : null
            }

            <div>
               <p>{blogInfo?.blog_post}</p>
            </div>
         </article>

         {displayComments}

      </div>
   );
}

export default PostDetails;