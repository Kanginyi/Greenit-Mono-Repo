import React from 'react';
import "../../Stylings/UserInfo.css";
import { useParams } from 'react-router-dom';
import placeholder_img from "../../placeholder.png";

function UserInfo({userData, postData, commentData, searchValue}) {
   // Getting the URL of the window
   const URL = window.location.href;
   const clickedID = parseInt(useParams().id);

   const checkUsersArray = userData?.filter(user => URL.endsWith(user?.id));

   const checkUser = (checkUsersArray?.filter(user => user?.id === clickedID))[0];

   const clickedUser = checkUser?.username;

   // Clicked User's blogs
   const checkPosts = postData?.filter(blog => blog?.user?.id === checkUser?.id);

   const renderPosts = checkPosts?.map(blog => {
      let post;
      if (blog?.blog_post?.length < 15) {
         post = blog?.blog_post;
      } else {
         post = blog?.blog_post?.slice(0, 15) + "...";
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
   const checkComments = commentData?.filter(comment => comment?.user?.id === checkUser?.id);

   const renderComments = checkComments?.map(comment => {
      return<div className="user-info-comments">
               <h3>{comment.blog.title}</h3>
               <p>{comment.comment_text}</p>
            </div>
   });

   const filterPosts = searchValue === "" ? renderPosts : renderPosts?.filter(blog => blog.props.children[1].props.children[0].props.children.toLowerCase().includes(searchValue.toLowerCase()));

   const filterComments = searchValue === "" ? renderComments : renderComments?.filter(comment => comment.props.children[1].props.children.toLowerCase().includes(searchValue.toLowerCase()));

   return (
      <div>
         <h2 id="clicked-username" className="username-color">u/{clickedUser}</h2>
         
         <div>
            <h3>Total Posts: {checkPosts.length}</h3>
            <div className="user-info-scroll">
               {filterPosts}
            </div>

            <h3>Total Comments: {checkComments.length}</h3>
            <div className="user-info-scroll">
               {filterComments}
            </div>
         </div>
      </div>
   );
}

export default UserInfo;