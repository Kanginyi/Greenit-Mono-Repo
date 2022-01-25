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

   const userObj = userData.filter(user => user.id === post.user.id);

   // Grab the ID so we can click the name
   let clickedID;
   if (userObj[0]?.username === newUsernames) {
      clickedID = userObj[0]?.id;
   }

   // Click onto username to show user's info
   let navigate = useNavigate();

   const clickUser = () => {
      navigate(`/users/${clickedID}`);
   }
   
   const [isClicked, setIsClicked] = useState(1);
   const [postLikes, setPostLikes] = useState(post.likes);
   const [postDisikes, setPostDisLikes] = useState(post.dislikes);

   // Three states of the buttons
   const notPressed = <>
                        <button
                           className="upvotes-button"
                        >
                           👍 {postLikes} Likes
                        </button>
                        &nbsp;
                        <button
                           className="downvotes-button"                          
                        >
                           {postDisikes} Dislikes 👎
                        </button>
                      </>

   const likesPressed = <>
                        <button
                           className="upvotes-button"
                           disabled="disabled"
                        >
                           👍 {postLikes} Likes
                        </button>
                        &nbsp;
                        <button
                           className="downvotes-button"                        
                        >
                           {postDisikes} Dislikes 👎
                        </button>
                      </>

   const dislikesPressed = <>
                        <button
                           className="upvotes-button"                        
                        >
                           👍 {postLikes} Likes
                        </button>
                        &nbsp;
                        <button
                           className="downvotes-button"
                           disabled="disabled"                      
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