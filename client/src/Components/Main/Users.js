import React from 'react';
import User from "./User";

function Users({userData}) {
   const checkUsers = userData?.map(user => <User key={user.id} username={user.username} id={user.id}/>);

   return (
      <>
         {checkUsers}
      </>
   );
}

export default Users;