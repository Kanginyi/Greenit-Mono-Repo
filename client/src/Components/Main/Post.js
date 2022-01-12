import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {BiUpvote, BiDownvote} from "react-icons/bi";

function Post({post, userData, handleDelete}) {
   const userObj = userData.filter(user => user.id === post.user.id);

   //Changing date format
   const date = post.create_at.slice(0, 10);
   let slash = date.replaceAll("-", "/");
   let dateFormat = slash.slice(5) + "/" + slash.slice(0, 4);
   
   // Handle likes
   const [likes, setLikes] = useState(0);

   useEffect(() => {
      fetch(`/blogs/${post.id}`)
          .then(resp => resp.json())
          .then(data => setLikes(data.likes));
   }, []);

  const handleLikes = () => {
      fetch(`/blogs/${post.id}/edit/likes`, {
         method: "PATCH",
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify({likes: likes + 1})
      })
         .then(resp => resp.json())
         .then(data => setLikes(data.likes));
   }

   // Handle dislikes
   const [dislikes, setDislikes] = useState(0);

   useEffect(() => {
      fetch(`/${post.id}`)
         .then(resp => resp.json())
         .then(data => setDislikes(data.dislikes));
   }, []);

   const handleDislikes = () => {
      fetch(`/${post.id}/edit/dislikes`, {
         method: "PATCH",
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify({dislikes: dislikes + 1})
      })
         .then(resp => resp.json())
         .then(data => setDislikes(data.dislikes));
   }

   // Getting the newly created usernames
   const [newUsernames, setNewUsernames] = useState("");

   useEffect(() => {
      fetch(`/users/${post.user_id}`)
         .then(resp => resp.json())
         .then(data => setNewUsernames(data?.username));
   }, []);

   
   return (
      <div className="post-div">
         
         <article className="single-post">
            <div className="user-info">
               <h5>Posted by <span className="username-color">u/{newUsernames}</span> on {dateFormat}</h5>
               <button className="delete-X" onClick={() => handleDelete(post.id)}>X</button>
            </div>

            <div className="post-info">
               <h3 className="forum-post-title">{post.title}</h3>
            </div> 

            {post.image_url ? <img src={post.image_url} alt={post.title}/> : null}

            <div>
               <p>{post.content_post}</p>
            </div>
         </article>

         <div>
            <button
               onClick={handleLikes}
               className="upvotes-button"
            >
               <BiUpvote className="upvote-fnt"/> {likes} Likes
            </button>
               &nbsp;
            <button
               onClick={handleDislikes}
               className="downvotes-button"
            >
               <BiDownvote className="dovote-fnt"/> {dislikes} Dislikes
            </button>
         </div>
            <br/>

         <div className="post-btn-section">
            <Link to={`/users/${post.id}`}>
               <button className="comment-btn">View Comments</button>
            </Link>
         </div>
      
      </div>
   );
}

export default Post;