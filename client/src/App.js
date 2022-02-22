import React, {useState, useEffect} from "react";
import Posts from "./Components/Main/Posts";
import Navbar from "./Components/Header/Navbar";
import Users from "./Components/Main/Users";
import PostDetails from "./Components/Main/PostDetails";
import LoginSignupForm from "./Components/Header/LoginSignupForm";

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
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify(post)
   })
      .then(resp => resp.json())
      .then(post => {
         setPostData([
            post, ...postData
         ])
      })
   }
  
   // Delete Posts
   const handleDelete = id => {
   fetch(`/blogs/${id}`,{
      method : "DELETE"
   })
   .then(() => {
      const deletePost = postData.filter(post => post.id !== id)
      setPostData(deletePost)
   })
   }

   // Different rendering options for Login component
   const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="App">
      
      <header className="fixed-navbar">
         <a href="#main-content" id="skip-nav">Skip Navigation</a>

         <Navbar
            search={search}
            handleAddPost={handleAddPost}
            setShowSignup={setShowSignup}
         />
      </header>

      <main id="main-content">
         <Routes>
            <Route path="/" element={
               <Posts
                  postData={postData}
                  userData={userData}
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

            <Route path="/blogs/:id" element={
               <PostDetails
                  userData={userData}
               />
            }/>

            <Route path="/welcome" element={
               <LoginSignupForm
                  showSignup={showSignup}
                  setShowSignup={setShowSignup}
               />
            }/>

         </Routes>
      </main>

    </div>
  );
}

export default App;