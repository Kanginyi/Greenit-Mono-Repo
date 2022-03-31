import React from 'react';
import "../../Stylings/Users.css";

import {useNavigate} from "react-router-dom";

function User({username, id, postData, commentData}) {
   const checkComments = commentData?.filter(comment => comment?.user?.id === id);
   const checkBlogs = postData?.filter(blog => blog?.user?.id === id);

   let navigate = useNavigate();

   const checkUserInfo = () => {
      navigate(`/all_users/${id}`);
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