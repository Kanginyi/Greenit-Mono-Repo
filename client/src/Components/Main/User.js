import React from 'react';

function User({username, id, comments, blogs}) {
   const checkComments = comments.filter(comment => comment.user.id === id);
   const checkBlogs = blogs.filter(blog => blog.user.id === id);
   
   return (
      <div className="user-div">
         <h2 className="username-color">{username}</h2>
         <h4>Total Posts: {checkBlogs.length}</h4>
         <h4>Total Comments: {checkComments.length}</h4>
      </div>
   );
}

export default User;