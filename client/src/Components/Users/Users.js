import React, {useState, useEffect} from 'react';
import Loader from "../Helpers/Loader";
import User from "./User";

function Users({userData, setUserData, postData, commentData, searchValue}) {
   const [isLoaded, setIsLoaded] = useState(false);

   useEffect(() => {
      fetch("/users")
         .then(resp => resp.json())
         .then(data => {
            setUserData(data);
            setIsLoaded(true);
         });
   }, [setUserData]);
   
   const checkUsers = userData?.map(user => <User key={user.id} username={user.username} id={user.id} comments={commentData} blogs={postData}/>);

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