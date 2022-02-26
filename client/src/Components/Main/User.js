import React from 'react';
import "../../Stylings/Users.css";

import {useNavigate} from "react-router-dom";

function User({username, id, comments, blogs}) {
   const checkComments = comments?.filter(comment => comment?.user?.id === id);
   const checkBlogs = blogs?.filter(blog => blog?.user?.id === id);

   let navigate = useNavigate();

   const checkUserInfo = () => {
      navigate(`/users/${id}`);
   }
  
   return (
      <div className="user-div" onClick={checkUserInfo}>
         <h2 className="username-color">
            <span>{username}</span>
         </h2>

         <div className="total-div">
            <p>Total Posts: {checkBlogs.length}</p>
            <p>Total Comments: {checkComments.length}</p>
         </div>
      </div>
   );
}

export default User;