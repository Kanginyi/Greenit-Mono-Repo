import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";

function PostDetails({userData}) {
   const [onePost, setOnePost] = useState([]);
   const [isLoaded, setIsLoaded] = useState(false);
   const [comments, setComments] = useState([]);

   const id = useParams().id;
   useEffect(() => {
      fetch(`/blogs/${id}`)
         .then(resp => resp.json())
         .then(singlePost => {
            setOnePost(singlePost)
            setIsLoaded(true)
         });
   }, []);

   useEffect(() => {
      fetch("/comments")
         .then(resp => resp.json())
         .then(data => setComments(data));
   }, []);

   const findComments = comments.filter(comment => comment.blog_id === onePost.id);

   const userObj = userData.filter(user => user.id === onePost.user_id);

   const displayComments = findComments.map(foundComment => {
      const storeUser = userData.filter(user => user.id === foundComment.user_id);
      
      return (
         <div className="comment-section">

            <div className="comment-text-class">
               <h3>{foundComment.comment_text}</h3>
            </div>

            <div>
               <h4 className="comment-username-class">-{storeUser[0]?.username}</h4>
            </div>

         </div>
      );
   });

   if (!isLoaded) {
      return <h2>Loading...</h2>
   }

   return (
      <div className="post-div">

         <article className="single-post">
            <div className="user-info">
               <h5>Posted by <span className="username-color">u/{userObj[0]?.username}</span></h5>
            </div>

            <div className="post-info">
               <h3 className="forum-post-title">{onePost.title}</h3>
            </div>

            {onePost.image_url ? <img src={onePost.image_url} alt={onePost.title}/> : null}

            <div>
               <p>{onePost.content_post}</p>
            </div>
         </article>

         <div className="comment-button-class">
            <button className="upvotes-button">
               👍 {onePost.likes} Likes
            </button>
               &nbsp;
            <button className="downvotes-button">
               👎 {onePost.dislikes} Dislikes
            </button>
         </div>

         {displayComments}
         <br/>

      </div>
   );
}

export default PostDetails;