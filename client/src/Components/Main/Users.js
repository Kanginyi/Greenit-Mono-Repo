import React from 'react';
import User from "./User";

function Users({userData}) {

   console.log(userData);

   const checkUsers = userData.map(user => {
      return <User
         key={user.id}
         username={user.username}
         id={user.id}
      />
   })

   return (
      {checkUsers}
   );
}

export default Users;