import React, {useState, useEffect} from 'react';
import {useNavigate, Link} from "react-router-dom";

function Post({post, userData, handleDelete}) {
   // Getting the newly created usernames
   const [newUsernames, setNewUsernames] = useState("");

   useEffect(() => {
      fetch(`/users/${post.user.id}`)
         .then(resp => resp.json())
         .then(data => setNewUsernames(data?.username));
   }, [post.user_id]);

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
   
   const [isClicked, setIsClicked] = useState(1);
   const [postLikes, setPostLikes] = useState(post.likes);
   const [postDisikes, setPostDisLikes] = useState(post.dislikes);
   
   // patch "blogs/inc_likes" to "blogs#increment_likes"
   // patch "blogs/inc_dislikes" to "blogs#increment_dislikes"

   // patch "blogs/dec_likes", to "blogs#decrement_likes"
   // patch "blogs/dec_dislikes", to "blogs#decrement_dislikes"

   // Likes and Dislikes handling functions
   const handleLikes = () => {
      fetch(`/blogs/inc_likes/${ID}`, {
         method: "PATCH",
         headers: {"Content-Type": "application/json"}
      })
         .then(resp => resp.json())
         .then(data => setPostLikes(() => data.likes));

       if (isClicked === 3) {
          fetch(`/blogs/dec_dislikes/${ID}`, {
             method: "PATCH",
             headers: {"Content-Type": "application/json"}
          })
            .then(resp => resp.json())
            .then(data => setPostDisLikes(() => data.dislikes));
       }

       setIsClicked(2);
   }

   const handleDislikes = () => {
      fetch(`blogs/inc_dislikes/${ID}`, {
         method: "PATCH",
         headers: {"Content-Type": "application/json"}
      })
         .then(resp => resp.json())
         .then(data => setPostDisLikes(() => data.dislikes));

      if (isClicked === 2) {
         fetch(`blogs/dec_likes/${ID}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"}
         })
            .then(resp => resp.json())
            .then(data => setPostLikes(() => data.likes));
      }
   }

   // Three states of the buttons
   const notPressed = <>
                        <button
                           className="upvotes-button"
                           onClick={handleLikes}
                        >
                           👍 {postLikes} Likes
                        </button>
                        &nbsp;
                        <button
                           className="downvotes-button"
                           onClick={handleDislikes}                      
                        >
                           {postDisikes} Dislikes 👎
                        </button>
                      </>

   const likesPressed = <>
                        <button
                           className="upvotes-button"
                           disabled="disabled"
                           onClick={handleLikes}
                        >
                           👍 {postLikes} Likes
                        </button>
                        &nbsp;
                        <button
                           className="downvotes-button"
                           onClick={handleDislikes}                     
                        >
                           {postDisikes} Dislikes 👎
                        </button>
                      </>

   const dislikesPressed = <>
                        <button
                           className="upvotes-button"
                           onClick={handleLikes}                      
                        >
                           👍 {postLikes} Likes
                        </button>
                        &nbsp;
                        <button
                           className="downvotes-button"
                           disabled="disabled"
                           onClick={handleDislikes}                    
                        >
                           {postDisikes} Dislikes 👎
                        </button>
                      </>

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
                     </span> on {post.created_at}
               </h3>
               <button className="delete-post" onClick={() => handleDelete(post.id)}>X</button>
            </div>

            <div className="post-info">
               <h3 className="post-title">{post.title}</h3>
            </div> 

            {post.image_url ? <img src={post.image_url} alt={post.title} style={{marginTop: "1rem"}}/> : null}

            <div>
               <p>{post.blog_post}</p>
            </div>
         </article>

         <div className="likes-button-container">
            {isClicked === 1 ? notPressed :
             isClicked === 2 ? likesPressed :
             dislikesPressed}
         </div>
            <br/>

         <div className="post-btn-section">
            <Link to={`/blogs/${post.id}`}>
               <button className="comment-btn">View Comments</button>
            </Link>
         </div>
      
      </div>
   );
}

export default Post;

// Fix the buttons onClick, the db routes
// Change the Link to useNavi, honestly both similar af