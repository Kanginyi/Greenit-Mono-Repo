import React from "react";
import {useNavigate} from "react-router-dom";

import {useSelector} from "react-redux";

import {BsTrash} from "react-icons/bs";
import {FaEdit} from "react-icons/fa";
import placeholder_img from "../../Images/placeholder.png";

function UserInfoBlogs({blog, blogData, setBlogData, commentData, setCommentData, currentUserInfo, userBlogsInfo, setUserBlogsInfo, userCommentsInfo, setUserCommentsInfo}) {
   let navigate = useNavigate();

   // State to handle current user's information
   const currentUser = useSelector(state => state.currentUser.value);

   // If blog's content is less than 15 characters in length, set blogPost to the original content
   // If blog's content is more than 15 characters in length, max it out to 15 characters, add "..." after it, and set blogPost to the shortened content
   let blogPost;
   if (blog?.blog_post?.length < 15) {
      blogPost = blog?.blog_post;
   } else {
      blogPost = blog?.blog_post?.slice(0, 15) + "...";
   }

   // Date & Time information for when the blog was created/posted
   const blogDate = new Date(blog?.created_at).toLocaleDateString();
   const blogTime = new Date(blog?.created_at).toLocaleTimeString();

   // Function to handle deleting related user's blogs using the id of the deleted blog
   const deleteUserBlog = () => {
      let confirmDelete = window.confirm(`Are you sure you want to delete "${blog?.title}"?`);

      // If confirmDelete returns true (because a user clicked confirm), then continue with delete actions
      if (confirmDelete) {
         fetch(`/blogs/${blog?.id}`, {
            method: "DELETE"
         })
            .then(() => {
               // deleteBlog variable to hold array that removes the deleted blog from userBlogsInfo and setUserBlogsInfo to that new array
               const deleteBlog = userBlogsInfo?.filter(eachBlog => eachBlog?.id !== blog?.id);
               setUserBlogsInfo(deleteBlog);

               // removeBlog variable to hold array that removes the deleted blog from blogData and setBlogData to that new array
               const removeBlog = blogData?.filter(eachBlog => eachBlog?.id !== blog?.id);
               setBlogData(removeBlog);

               // deletedRelatedComments variable to hold array that removes the deleted blog's comments from userCommmentsInfo and setUserCommentsInfo to that new array
               const deleteRelatedComments = userCommentsInfo?.filter(eachComment => eachComment?.blog?.id !== blog?.id);
               setUserCommentsInfo(deleteRelatedComments);

               // removeComments variable to hold array that removes the deleted blog's comments from commentData and setCommentData to that new array
               const removeComments = commentData?.filter(eachComment => eachComment?.blog?.id !== blog?.id);
               setCommentData(removeComments);
            })
      }
   }

   return (
      <div className="user-info-blogs">
         <div
            onClick={() => navigate(`/blogs/${blog?.id}`)}
            className="user-blog-container"
         >
            {/* If blog.image_url exists, show that image. If not, show the placeholder image */}
            <img src={blog?.image_url ? blog?.image_url : placeholder_img} alt={blog?.title}/>

            <div>
               <h4>{blog?.title}</h4>
               <em>{blogPost}</em>
               <p>
                  {/* Proper grammar based on the amount of likes, dislikes, and comments on the blog */}
                  {blog?.likes === 1 ? `${blog?.likes} Like` : `${blog?.likes} Likes`}
                     &nbsp;|&nbsp;
                  {blog?.dislikes === 1 ? `${blog?.dislikes} Dislike` : `${blog?.dislikes} Dislikes`}
                     &nbsp;|&nbsp;
                  {blog?.comments?.length === 1 ? `${blog?.comments?.length} Comment` : `${blog?.comments?.length} Comments`}
               </p>
               <p className="blog-comments-footer">
                  <em>
                     Posted on&nbsp;
                     <time dateTime={`${blogDate} ${blogTime}`}>
                        {blogDate} at {blogTime}
                     </time>
                  </em>
               </p>
            </div>
         </div>

         {/* If the currentUser's id is the same as the currentUserInfo's id, give the user the options to delete or edit the blog */}
         {currentUser?.id === currentUserInfo?.id &&
            <div className="user-info-actions">
               <BsTrash
                  onClick={deleteUserBlog}
                  className="delete-button cursor-pointer"
                  title={`Delete "${blog?.title}"`}
               />

               <FaEdit
                  onClick={() => navigate(`/editing/${blog?.id}`)}
                  className="user-edit cursor-pointer"
                  title={`Edit "${blog?.title}"`}
               />
            </div>
         }
      </div>
   );
}

export default UserInfoBlogs;