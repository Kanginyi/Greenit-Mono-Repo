import React from 'react';
import Post from "./Post";

function Posts({currentUser, postData, userData, searchValue, handleDelete, setClickedPostID}) {
   const renderPosts = postData?.map(post => {
      return <Post key={post.id} currentUser={currentUser} post={post} userData={userData} handleDelete={handleDelete} setClickedPostID={setClickedPostID}/>
   });

   const filterData = searchValue === "" ? renderPosts : renderPosts.filter(blog => blog.props.post.title.toLowerCase().includes(searchValue.toLowerCase()) || blog.props.post.user.username.toLowerCase().includes(searchValue.toLowerCase()));

   return (
      <div>
         {filterData}
      </div>
   );
}

export default Posts;