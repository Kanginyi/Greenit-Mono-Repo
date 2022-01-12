import React, {useState, useEffect} from 'react';

function User({username, id}) {
   //This is for comments length
   const [commentsData, setCommentsData] = useState([]);

   useEffect(() => {
      fetch("/comments")
         .then(resp => resp.json())
         .then(data => setCommentsData(data));
   }, []);
   
   const checkComments = commentsData.filter(comment => comment.user_id === id);

   //This is for blogs length
   const [blogsData, setBlogsData] = useState([]);

   useEffect(() => {
      fetch("/blogs")
            .then(resp => resp.json())
            .then(data => setBlogsData(data));
   }, [])

   const checkBlogs = blogsData.filter(blog => blog.user_id === id);

   return (
      <div className="user-div">
         <h2 className="username-color">{username}</h2>
         <h4>Total Posts: {checkBlogs.length}</h4>
         <h4>Total Comments: {checkComments.length}</h4>
      </div>
   );
}

export default User;