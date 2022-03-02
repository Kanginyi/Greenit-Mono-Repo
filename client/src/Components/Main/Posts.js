import React from 'react';
import Post from "./Post";

function Posts({currentUser, postData, userData, searchValue, handleDelete}) {
   const renderPosts = postData?.map(post => {
      return <Post key={post.id} currentUser={currentUser} post={post} userData={userData} handleDelete={handleDelete}/>
   });

   const sortPosts = renderPosts?.sort((a, b) => b.props.post.created_at.localeCompare(a.props.post.created_at));

   const filterPosts = searchValue === "" ? sortPosts : sortPosts.filter(blog => blog.props.post.title.toLowerCase().includes(searchValue.toLowerCase()) || blog.props.post.user.username.toLowerCase().includes(searchValue.toLowerCase()));

   return (
      <div>
         {filterPosts}
      </div>
   );
}

export default Posts;