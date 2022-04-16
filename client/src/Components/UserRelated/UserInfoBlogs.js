import React from "react";
import {useNavigate} from "react-router-dom";

import {BsTrash} from "react-icons/bs";
import {FaEdit} from "react-icons/fa";
import placeholder_img from "../../Images/placeholder.png";

function UserInfoBlogs({blog, currentUser, blogData, setBlogData, commentData, setCommentData, currentUserInfo, userBlogsInfo, setUserBlogsInfo, userCommentsInfo, setUserCommentsInfo}) {
   let navigate = useNavigate();

   let blogPost;
   if (blog?.blog_post?.length < 15) {
      blogPost = blog?.blog_post;
   } else {
      blogPost = blog?.blog_post?.slice(0, 15) + "...";
   }

   // Date & Time information for when the blog was created/posted
   const blogDate = new Date(blog?.created_at).toLocaleDateString();
   const blogTime = new Date(blog?.created_at).toLocaleTimeString();

   const deleteUserBlog = () => {
      let confirmDelete = window.confirm(`Are you sure you want to delete "${blog?.title}"?`);

      if (confirmDelete) {
         fetch(`/blogs/${blog?.id}`, {
            method: "DELETE"
         })
            .then(() => {
               const deleteBlog = userBlogsInfo?.filter(eachBlog => eachBlog?.id !== blog?.id);

               setUserBlogsInfo(deleteBlog);

               const deleteRelatedComments = userCommentsInfo?.filter(eachComment => eachComment?.blog?.id !== blog?.id);

               setUserCommentsInfo(deleteRelatedComments);

               const removeBlog = blogData?.filter(eachBlog => eachBlog?.id !== blog?.id);

               setBlogData(removeBlog);

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
            <img src={blog?.image_url ? blog?.image_url : placeholder_img} alt={blog?.title}/>

            <div>
               <h4>{blog?.title}</h4>
               <em>{blogPost}</em>
               <p>
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

         {currentUser?.id === currentUserInfo?.id
            ?
               <div className="user-info-actions">
                  <BsTrash
                     onClick={deleteUserBlog}
                     className="delete-button"
                     title={`Delete "${blog?.title}"`}
                  />

                  <FaEdit
                     onClick={() => navigate(`/editing/${blog?.id}`)}
                     className="user-edit"
                     title={`Edit "${blog?.title}"`}
                  />
               </div>
            : null
         }
      </div>
   );
}

export default UserInfoBlogs;