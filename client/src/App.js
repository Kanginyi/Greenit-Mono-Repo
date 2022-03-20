import React, {useState, useEffect} from "react";
import Posts from "./Components/Main/Posts";
import Navbar from "./Components/Header/Navbar";
import Users from "./Components/Users/Users";
import UserInfo from "./Components/Users/UserInfo";
import PostDetails from "./Components/Main/PostDetails";
import LoginSignupForm from "./Components/LoginSignup/LoginSignupForm";
import EditPost from "./Components/Main/EditPost";
import Loader from "./Components/Helpers/Loader";

import {Route, Routes, useNavigate} from "react-router-dom";

function App() {
   // Getting current user information
   const [currentUser, setCurrentUser] = useState(null);

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

   const [isLoaded, setIsLoaded] = useState(false);
   
   const [postData, setPostData] = useState([]);
   const [userData, setUserData] = useState([]);
   const [commentData, setCommentData] = useState([]);

   let navigate = useNavigate();

   useEffect(() => {
      fetch("/blogs")
         .then(resp => resp.json())
         .then(data => {
            setPostData(data);
            setIsLoaded(true);
         });
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
    
   // Delete Posts
   const handleDelete = id => {
      let checkDelete = window.confirm("Are you sure you want to delete your post?");

      if (checkDelete) {
         fetch(`/blogs/${id}`,{
            method : "DELETE"
         })
         .then(() => {
            const deletePost = postData.filter(post => post.id !== id);
            setPostData(deletePost);
            setUserData([...userData]);
            setCommentData([...commentData]);
         })
         navigate("/");
      }
   }

   // Different rendering options for Login component
   const [showSignup, setShowSignup] = useState(false);

   // PostData.length for random page
   const numbersOfBlogs = postData?.length;

   // Loading screen component
   if (!isLoaded) {
      return <Loader/>
   }

  return (
    <div className="App">
      
      <header className="fixed-navbar">
         <a href="#main-content" id="skip-nav">Skip Navigation</a>

         <Navbar
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            search={search}
            postData={postData}
            setPostData={setPostData}
            userData={userData}
            setUserData={setUserData}
            commentData={commentData}
            setCommentData={setCommentData}
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
                  setPostData={setPostData}
                  userData={userData}
                  searchValue={searchValue}
                  handleDelete={handleDelete}
               />
            }/>

            <Route path="/all_users" element={
               <Users
                  userData={userData}
                  searchValue={searchValue}
               />
            }/>

            <Route path="/all_users/:id" element={
               <UserInfo
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  userData={userData}
                  setUserData={setUserData}
                  postData={postData}
                  setPostData={setPostData}
                  commentData={commentData}
                  setCommentData={setCommentData}
                  searchValue={searchValue}
               />
            }/>

            <Route path="/blogs/:id" element={
               <PostDetails
                  currentUser={currentUser}
                  userData={userData}
                  postData={postData}
                  setPostData={setPostData}
                  commentData={commentData}
                  setCommentData={setCommentData}
                  searchValue={searchValue}
                  handleDelete={handleDelete}
               />
            }/>

            <Route path="/welcome" element={
               <LoginSignupForm
                  setCurrentUser={setCurrentUser}
                  setUserData={setUserData}
                  showSignup={showSignup}
                  setShowSignup={setShowSignup}
               />
            }/>

            <Route path="/editing/:id" element={
               <EditPost
                  currentUser={currentUser}
                  postData={postData}
                  setPostData={setPostData}
               />
            }/>

         </Routes>
      </main>

    </div>
  );
}

export default App;