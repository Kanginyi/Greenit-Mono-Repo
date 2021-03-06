import React, {useEffect, useState} from 'react';

import User from "./User";
import Loader from "../Helpers/Loader";

import {useSelector} from "react-redux";

function AllUsers({userData, blogData, commentData}) {
   // State to handle search bar's inputted value
   const searchValue = useSelector(state => state.searchValue.value);

   // State to handle whether to show Loader component or not
   const [isLoaded, setIsLoaded] = useState(false);

   // useEffect to mimic page load time; keep things commented out for future reference/just in case we may need to clear side effects later
   useEffect(() => {
      // const timedLoad = 
      setTimeout(() => {
         setIsLoaded(true);
      }, 500);

      // return clearTimeout(timedLoad);
   }, []);
   
   // Map through userData and render each User component by passing in the related information as props
   const renderUsers = userData?.map(user => {
      return <User
               key={user?.id}
               user={user}
               blogData={blogData}
               commentData={commentData}
             />
   });

   // If searchValue is an empty string, render all users inside renderUsers. As searchValue gets updated, check each user's username to see if it includes the inputted searchValue
   const filterUsers = searchValue === "" ? renderUsers : renderUsers?.filter(user => user?.props?.user?.username?.toLowerCase()?.includes(searchValue?.toLowerCase()));

   // If isLoaded is still false, show Loader component
   if (!isLoaded) {
      return <Loader/>
   };

   return (
      <div>
         {filterUsers}
      </div>
   );
}

export default AllUsers;