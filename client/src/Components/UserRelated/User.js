import React from "react";

import {useNavigate} from "react-router-dom";

import "../../Stylings/Users.css";

function User({user, postData, commentData}) {
   const checkBlogs = postData?.filter(blog => blog?.user?.id === user?.id);
   const checkComments = commentData?.filter(comment => comment?.user?.id === user?.id);

   let navigate = useNavigate();

   const checkUserInfo = () => {
      navigate(`/all_users/${user?.id}`);
   };
  
   return (
      <div className="user-div" onClick={checkUserInfo}>
         <h2 className="username-color">
            <span>{user?.username}</span>
         </h2>

         <div className="total-div">
            <p>Total Posts: {checkBlogs.length}</p>
            <p>Total Comments: {checkComments.length}</p>
         </div>
      </div>
   );
}

export default User;