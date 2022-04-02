import React from "react";

import Post from "./Post";

function Posts({currentUser, blogData, searchValue, handleDeleteBlog, handleBlogLikes, handleBlogDislikes, handleUnlikeBlog, handleUndislikeBlog}) {
   // Map through blogData and render each Post component by passing in the related information as props
   const renderBlogs = blogData?.map(blog => {
      return <Post
               key={blog?.id}
               currentUser={currentUser}
               blog={blog}
               handleDeleteBlog={handleDeleteBlog}
               handleBlogLikes={handleBlogLikes}
               handleBlogDislikes={handleBlogDislikes}
               handleUnlikeBlog={handleUnlikeBlog}
               handleUndislikeBlog={handleUndislikeBlog}
             />
   });

   // Sort through renderBlogs's Post components and display them from newest to oldest by their "created_at" information
   const sortBlogs = renderBlogs?.sort((a, b) => b?.props?.blog?.created_at?.localeCompare(a?.props?.blog?.created_at));

   // If searchValue is an empty string, render all blogs inside sortBlogs. As searchValue gets updated, check each blog's title OR each blog author's username to see if they include the inputted searchValue
   const filterBlogs = searchValue === "" ? sortBlogs : sortBlogs?.filter(blog => blog?.props?.blog?.title?.toLowerCase()?.includes(searchValue?.toLowerCase()) || blog?.props?.blog?.user?.username?.toLowerCase()?.includes(searchValue?.toLowerCase()));

   return (
      <div>
         {filterBlogs}
      </div>
   );
}

export default Posts;