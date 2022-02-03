import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import "../../Stylings/Post.css";

import {BsTrash} from "react-icons/bs";

function Post({post, userData, handleDelete}) {
   // Getting the newly created usernames
   const [newUsernames, setNewUsernames] = useState("");

   useEffect(() => {
      fetch(`/users/${post.user.id}`)
         .then(resp => resp.json())
         .then(data => setNewUsernames(data?.username));
   }, [post.user.id]);

   const userObj = userData?.filter(user => user?.id === post?.user?.id);
   const ID = userObj[0]?.id;

   // Grab the ID so we can click the name
   let clickedID;
   if (userObj[0]?.username === newUsernames) {
      clickedID = ID;
   }

   // Click onto username to show user's info
   let navigate = useNavigate();

   const clickUser = () => {
      navigate(`/users/${clickedID}`);
   }

   const viewMore = () => {
      navigate(`/blogs/${post.id}`);
   }

   const [isClicked, setIsClicked] = useState(1);
   const [postLikes, setPostLikes] = useState(post?.likes);
   const [postDislikes, setPostDislikes] = useState(post?.dislikes); 

   const postID = post?.id;
   
   // Likes and Dislikes handling functions
   const handleLikes = () => {
      fetch(`/inc_likes/${postID}`, {
         method: "PATCH",
         headers: {"Content-Type": "application/json"}
      })
         .then(resp => resp.json())
         .then(data => setPostLikes(data.likes));

       if (isClicked === 3) {
          fetch(`/dec_dislikes/${postID}`, {
             method: "PATCH",
             headers: {"Content-Type": "application/json"}
          })
            .then(resp => resp.json())
            .then(data => setPostDislikes(data.dislikes));
       }

       setIsClicked(2);
   }

   const handleDislikes = () => {
      fetch(`/inc_dislikes/${postID}`, {
         method: "PATCH",
         headers: {"Content-Type": "application/json"}
      })
         .then(resp => resp.json())
         .then(data => setPostDislikes(data.dislikes));

      if (isClicked === 2) {
         fetch(`/dec_likes/${postID}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"}
         })
            .then(resp => resp.json())
            .then(data => setPostLikes(data.likes));
      }

      setIsClicked(3);
   }

   // Three states of the buttons
   const notPressed = <>
                        <button
                           className="likes-button"
                           onClick={handleLikes}
                        >
                           👍 {postLikes}
                        </button>

                        <button
                           className="dislikes-button"
                           onClick={handleDislikes}                      
                        >
                            👎 {postDislikes}
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
                            👎 {postDislikes}
                        </button>
                      </>

   const dislikesPressed = <>
                        <button
                           className="likes-button"
                           onClick={handleLikes}                      
                        >
                           👍 {postLikes} 
                        </button>

                        <button
                           className="dislikes-pressed"
                           disabled="disabled"
                           onClick={handleDislikes}                    
                        >
                           👎 {postDislikes}
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
   if (post.blog_post.length > 100) {
      renderOnMainPage = post.blog_post.slice(0, 100) + "...";
   } else {
      renderOnMainPage = post.blog_post;
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
                     >
                        u/{newUsernames}
                     </span> on {postDate} at {postTime}
               </h3>

               <BsTrash onClick={() => handleDelete(post.id)} className="delete-post"/>
            </div>

            <div className="post-header">
               <div className="likes-button-container">
                  {isClicked === 1 ? notPressed :
                  isClicked === 2 ? likesPressed :
                  dislikesPressed}
               </div>
                     &nbsp;
               <h3 className="post-title">{post.title}</h3>
            </div> 

            {post.image_url ? <img src={post.image_url} alt={post.title} style={{marginTop: "1rem"}}/> : null}

            <p>
               {renderOnMainPage}
            </p>
         </article>

         <div className="view-more-container">
            <button onClick={viewMore} className="post-view-more">
               VIEW MORE
            </button>
         </div>
      
      </div>
   );
}

export default Post;