import React from "react";

import Post from "./Post";

function Posts({currentUser, userData, postData, searchValue, handleDelete}) {
   // Map through postData and render each Post component by passing in the related information as props
   const renderPosts = postData?.map(post => {
      return <Post
               key={post?.id}
               currentUser={currentUser}
               post={post}
               handleDelete={handleDelete}
             />
   });

   // Sort through renderPosts's Post components and display them from newest to oldest by their "created_at" information
   const sortPosts = renderPosts?.sort((a, b) => b?.props?.post?.created_at?.localeCompare(a?.props?.post?.created_at));

   // If searchValue is an empty string, render all posts inside sortPosts. As searchValue gets updated, check each post's title OR each post author's username to see if they include the inputted searchValue
   const filterPosts = searchValue === "" ? sortPosts : sortPosts?.filter(blog => blog?.props?.post?.title?.toLowerCase()?.includes(searchValue?.toLowerCase()) || blog?.props?.post?.user?.username?.toLowerCase()?.includes(searchValue?.toLowerCase()));

   return (
      <div>
         {filterPosts}
      </div>
   );
}

export default Posts;