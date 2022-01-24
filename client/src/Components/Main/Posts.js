import React, {useState, useEffect} from 'react';
import Post from "./Post";

function Posts({data, searchValue, handleDelete}) {
   const [userData, setUserData] = useState([]);

   useEffect(() => {
      fetch("/users")
          .then(resp => resp.json())
          .then(data => setUserData(data));
   }, [])

   const postData = data.map(post => {
      return <Post key={post.id} post={post} userData={userData} handleDelete={handleDelete}/>
   });

   const filterData = searchValue === "" ? postData : postData.filter(blog => blog.props.post.title.toLowerCase().includes(searchValue.toLowerCase()));

   return (
      <div>
         {filterData}
      </div>
   );
}

export default Posts;