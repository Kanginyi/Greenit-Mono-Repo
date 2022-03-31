import React, {useState, useEffect} from 'react';
import Loader from "../Helpers/Loader";
import User from "./User";

function Users({userData, postData, commentData, searchValue}) {
   const [isLoaded, setIsLoaded] = useState(false);

   useEffect(() => {
      // const timedLoad = 
      setTimeout(() => {
         setIsLoaded(true);
      }, 500);

      // return clearTimeout(timedLoad);
   }, []);
   
   const checkUsers = userData?.map(user => {
      return <User
               key={user.id}
               username={user.username}
               id={user.id}
               postData={postData}
               commentData={commentData}
             />
   });

   const filterUsers = searchValue === "" ? checkUsers : checkUsers.filter(user => user.props.username.toLowerCase().includes(searchValue.toLowerCase()));

   // Loading screen component
   if (!isLoaded) {
      return <Loader/>
   }

   return (
      <div>
         {filterUsers}
      </div>
   );
}

export default Users;