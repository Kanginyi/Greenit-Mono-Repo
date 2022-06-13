import React from "react";
import {useNavigate} from "react-router-dom";

import "../../Stylings/Users.css";

function User({user, blogData, commentData}) {
   let navigate = useNavigate();

   // Filter through blogData & commentData to find all blogs & comments related to each individual user
   const checkBlogs = blogData?.filter(blog => blog?.user?.id === user?.id);
   const checkComments = commentData?.filter(comment => comment?.user?.id === user?.id);

   // Function to navigate to clicked user's profile when user clicks related div
   const viewUserInfo = () => {
      navigate(`/all_users/${user?.id}`);
   };
  
   return (
      <div className="user-div" onClick={viewUserInfo}>
         <h2 className="username-color text-align-center">
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