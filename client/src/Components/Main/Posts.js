import React from 'react';
import Post from "./Post";

function Posts({postData, userData, searchValue, handleDelete}) {
   const renderPosts = postData?.map(post => {
      return <Post key={post.id} post={post} userData={userData} handleDelete={handleDelete}/>
   });

   const filterData = searchValue === "" ? renderPosts : renderPosts.filter(blog => blog.props.post.title.toLowerCase().includes(searchValue.toLowerCase()));

   return (
      <div>
         {filterData}
      </div>
   );
}

export default Posts;