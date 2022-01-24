import React from 'react';
import "../../Stylings/Users.css";

function User({username, id, comments, blogs}) {
   const checkComments = comments.filter(comment => comment.user.id === id);
   const checkBlogs = blogs.filter(blog => blog.user.id === id);
   
   return (
      <div className="user-div">
         <h3 className="username-color">
            <span>{username}</span>
         </h3>

         <div className="total-div">
            <p>Total Posts: {checkBlogs.length}</p>
            <p>Total Comments: {checkComments.length}</p>
         </div>
      </div>
   );
}

export default User;