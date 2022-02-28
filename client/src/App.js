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

   // Getting current user information
   const [currentUser, setCurrentUser] = useState(null);

   // useEffect(() => {
   //    fetch("/me")
   //       .then(resp => resp.json())
   //       .then(data => setCurrentUser(data));
   // }, []);

   useEffect(() => {
      fetch("/me")
         .then(resp => {
            if (resp.ok) {
               resp.json()
                  .then(user => {
                     setCurrentUser(user)
                  })
            }
         })
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

   // PostData.length for random page
   const numbersOfBlogs = postData?.length;

  return (
    <div className="App">
      
      <header className="fixed-navbar">
         <a href="#main-content" id="skip-nav">Skip Navigation</a>

         <Navbar
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            search={search}
            handleAddPost={handleAddPost}
            setShowSignup={setShowSignup}
            numbersOfBlogs={numbersOfBlogs}
         />
      </header>

      <main id="main-content">
         <Routes>
            <Route path="/" element={
               <Posts
                  currentUser={currentUser}
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
                  currentUser={currentUser}
                  userData={userData}
                  postData={postData}
                  commentData={commentData}
                  handleDelete={handleDelete}
               />
            }/>

            <Route path="/welcome" element={
               <LoginSignupForm
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
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