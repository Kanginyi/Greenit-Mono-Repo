import React, {useState, useEffect} from 'react';
import User from "./User";

function Users({userData}) {
   // Essentially for Blogs and Comments length in child component of User
   const [blogsData, setBlogsData] = useState([]);
   const [commentsData, setCommentsData] = useState([]);

   useEffect(() => {
      fetch("/blogs")
         .then(resp => resp.json())
         .then(data =>  setBlogsData(data));
   }, []);

   useEffect(() => {
      fetch("/comments")
      .then(resp => resp.json())
      .then(data => setCommentsData(data));
   }, []);
   
   const checkUsers = userData?.map(user => <User key={user.id} username={user.username} id={user.id} comments={commentsData} blogs={blogsData}/>);

   return (
      <>
         {checkUsers}
      </>
   );
}

export default Users;