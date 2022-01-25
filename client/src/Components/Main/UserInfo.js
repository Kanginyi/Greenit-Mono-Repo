import React from 'react';
import "../../Stylings/UserInfo.css";
import placeholder_img from "../../placeholder.png";

function UserInfo({userData, postData, commentData, searchValue}) {
   // Getting the URL of the window
   const URL = window.location.href;

   // Clicked User's username
   const checkUser = userData?.filter(user => URL.endsWith(user?.id));
   const clickedUser = checkUser[0]?.username;

   // Clicked User's blogs
   const checkPosts = postData?.filter(blog => blog?.user?.id === checkUser[0]?.id);

   const renderPosts = checkPosts?.map(blog => {
      let post;
      if (blog.blog_post.length < 15) {
         post = blog.blog_post;
      } else {
         post = blog.blog_post.slice(0, 15) + "...";
      }

      return<div className="user-info-blogs">
               <img src={blog.image_url ? blog.image_url : placeholder_img} alt={blog.title}/>
               <div>
                  <h3>{blog.title}</h3>
                  <p>{post}</p>
                  <p>{blog.likes} Likes | {blog.dislikes} Dislikes</p>
               </div>
            </div>
   });

   // Clicked User's comments
   const checkComments = commentData?.filter(comment => comment?.user?.id === checkUser[0]?.id);

   const renderComments = checkComments?.map(comment => {
      return<div className="user-info-comments">
               <h3>{comment.blog.title}</h3>
               <p>{comment.comment_text}</p>
            </div>
   });

   // console.log(searchValue);


   


   return (
      <div>
         <h2 id="clicked-username" className="username-color">u/{clickedUser}</h2>
         
         <div>
            <h3>Total Posts: {checkPosts.length}</h3>
            <div className="user-info-scroll">
               {renderPosts}
            </div>

            <h3>Total Comments: {checkComments.length}</h3>
            <div className="user-info-scroll">
               {renderComments}
            </div>
         </div>
      </div>
   );
}

export default UserInfo;