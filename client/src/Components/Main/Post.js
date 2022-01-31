import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";

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

   // Click to view more about the post
   const viewMore = () => {
      navigate(`/blogs/${post.id}`);
   }
   
   const [isClicked, setIsClicked] = useState(1);
   const [postLikes, setPostLikes] = useState(post?.likes);
   const [postDislikes, setPostDislikes] = useState(post?.dislikes); 

   const postID = post?.id;
   
   // Likes and Dislikes handling functions
   const handleLikes = () => {
      fetch(`/blogs/inc_likes/${postID}`, {
         method: "PATCH",
         headers: {"Content-Type": "application/json"}
      })
         .then(resp => resp.json())
         .then(data => setPostLikes(data.likes));

       if (isClicked === 3) {
          fetch(`/blogs/dec_dislikes/${postID}`, {
             method: "PATCH",
             headers: {"Content-Type": "application/json"}
          })
            .then(resp => resp.json())
            .then(data => setPostDislikes(data.dislikes));
       }

       setIsClicked(2);
   }

   const handleDislikes = () => {
      fetch(`blogs/inc_dislikes/${postID}`, {
         method: "PATCH",
         headers: {"Content-Type": "application/json"}
      })
         .then(resp => resp.json())
         .then(data => setPostDislikes(data.dislikes));

      if (isClicked === 2) {
         fetch(`blogs/dec_likes/${postID}`, {
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
                           className="upvotes-button"
                           onClick={handleLikes}
                        >
                           👍 {postLikes}
                        </button>

                        <button
                           className="downvotes-button"
                           onClick={handleDislikes}                      
                        >
                           {postDislikes} 👎
                        </button>
                      </>

   const likesPressed = <>
                        <button
                           className="upvotes-button"
                           disabled="disabled"
                           onClick={handleLikes}
                        >
                           👍 {postLikes}
                        </button>

                        <button
                           className="downvotes-button"
                           onClick={handleDislikes}                     
                        >
                           {postDislikes} 👎
                        </button>
                      </>

   const dislikesPressed = <>
                        <button
                           className="upvotes-button"
                           onClick={handleLikes}                      
                        >
                           👍 {postLikes} 
                        </button>

                        <button
                           className="downvotes-button"
                           disabled="disabled"
                           onClick={handleDislikes}                    
                        >
                           {postDislikes} 👎
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
               <div className="likes-button-container">
                  {isClicked === 1 ? notPressed :
                  isClicked === 2 ? likesPressed :
                  dislikesPressed}
               </div>
                     &nbsp;
               <h3 className="post-title">{post.title}</h3>
            </div> 

            {post.image_url ? <img src={post.image_url} alt={post.title} style={{marginTop: "1rem"}}/> : null}

            <div>
               <p>{post.blog_post}</p>
            </div>
         </article>

         {/* <div className="likes-button-container">
            {isClicked === 1 ? notPressed :
             isClicked === 2 ? likesPressed :
             dislikesPressed}
         </div> */}
            {/* <br/> */}

         <div className="post-btn-section">
            <button onClick={viewMore} className="comment-btn">View More</button>
         </div>
      
      </div>
   );
}

export default Post;