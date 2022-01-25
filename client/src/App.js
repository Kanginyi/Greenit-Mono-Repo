import React, {useState, useEffect} from "react";
import Posts from "./Components/Main/Posts";
import Navbar from "./Components/Header/Navbar";
import CategoryBar from "./Components/Main/CategoryBar";
import Users from "./Components/Main/Users";
import PostDetails from "./Components/Main/PostDetails";

import {Route, Routes} from "react-router-dom";
import UserInfo from "./Components/Main/UserInfo";

function App() {
   const [postData, setPostData] = useState([]);
   const [userData, setUserData] = useState([]);
   const [commentData, setCommentData] = useState([]);

   useEffect(() => {
      fetch("/blogs")
         .then(resp => resp.json())
         .then(data => setPostData(data));
   }, []);

   useEffect(() => {
      fetch("/users")
         .then(resp => resp.json())
         .then(data => setUserData(data));
   }, []);
   
   useEffect(() => {
      fetch("/comments")
         .then(resp => resp.json())
         .then(data => setCommentData(data));
   }, []);

   // Search Bar
   const [searchValue, setSearchValue] = useState("");

   function search(e) {
   setSearchValue(e.target.value);
   }
  
   // FORM SUBMITS
   const handleAddPost = post => {
   fetch("/blogs", {
      method: "POST",
      headers: {
         "Content-Type" : "application/json",
      },
      body: JSON.stringify(post)
   })
      .then(resp => resp.json())
      .then(post => {
         setPostData([
         ...postData, post 
         ])
      })
   }
  
   // Delete Posts
   const handleDelete = id => {
   fetch(`/blogs/${id}`,{
      method : 'DELETE'
   })
   .then(() => {
      const deletePost = postData.filter(post => post.id !== id)
      setPostData(deletePost)
   })
   }

  return (
    <div className="App">
      
      <header className="fixed-navbar">
         <Navbar search={search}/>
      </header>

      <main>
         <CategoryBar handleAddPost={handleAddPost}/>
            <Routes>
               <Route path="/" element={
                  <Posts
                     data={postData}
                     searchValue={searchValue}
                     handleDelete={handleDelete}
                  />
               }/>

               <Route path="/users" element={
                  <Users
                     userData={userData}
                     searchValue={searchValue}
                  />
               }/>

               <Route path="/users/:id" element={
                  <UserInfo
                     userData={userData}
                     postData={postData}
                     commentData={commentData}
                     searchValue={searchValue}
                  />
               }/>

               {/* <Route path="/posts/:id" element={<PostDetails userData={userData}/>}/> */}

            </Routes>
      </main>

    </div>
  );
}

export default App;