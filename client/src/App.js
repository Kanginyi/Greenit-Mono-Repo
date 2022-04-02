import React, {useEffect, useState} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";

import Navbar from "./Components/Header/Navbar";
import ErrorPage from "./Components/Helpers/ErrorPage";
import Loader from "./Components/Helpers/Loader";
import LoginSignupForm from "./Components/LoginSignup/LoginSignupForm";
import EditPost from "./Components/PostRelated/EditPost";
import PostDetails from "./Components/PostRelated/PostDetails";
import Posts from "./Components/PostRelated/Posts";
import UserInfo from "./Components/UserRelated/UserInfo";
import Users from "./Components/UserRelated/Users";

function App() {
   let navigate = useNavigate();

   // State to handle current user's information
   const [currentUser, setCurrentUser] = useState(null);

   // Setting current user's information when someone logs in
   useEffect(() => {
      fetch("/me")
         .then(resp => {
            if (resp.ok) {
               resp.json()
                  .then(user => {
                     setCurrentUser(user);
                  })
            }
         })
   }, []);

   // State to handle whether to show Loader component or not
   const [isLoaded, setIsLoaded] = useState(false);
   
   // States to handle initial fetches for ALL initial posts, users, and comments
   const [blogData, setBlogData] = useState([]);
   const [userData, setUserData] = useState([]);
   const [commentData, setCommentData] = useState([]);

   useEffect(() => {
      fetch("/blogs")
         .then(resp => resp.json())
         .then(data => {
            setBlogData(data);
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

   // State to handle search bar value
   const [searchValue, setSearchValue] = useState("");

   // Function to update searchValue's state based on search bar's inputted values
   const searchGreenit = e => {
      setSearchValue(e.target.value);
   };
    
   // Function to handle deleting posts using the id of the deleted blog
   const handleDelete = id => {
      let checkDelete = window.confirm("Are you sure you want to delete your post?");

      // If the checkDelete returns true (because a user clicked confirm), then continue with delete actions
      if (checkDelete) {
         fetch(`/blogs/${id}`,{
            method : "DELETE"
         })
            .then(() => {
               // deleteBlog variable to hold array that removes the deleted blog from blogData and setBlogData to that new array
               const deleteBlog = blogData?.filter(post => post?.id !== id);
               setBlogData(deleteBlog);

               // deleteRelatedComments variable to hold array that removes the deleted blog's comments from commentData and setCommentData to that new array
               const deleteRelatedComments = commentData?.filter(comment => comment?.blog?.id !== id)
               setCommentData(deleteRelatedComments);
            })
         navigate("/");
      }
   };

   
   // TESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTEST

   // Function to handle liking posts using the id of the liked blog
   const handlePostLikes = (id, setPostLikes, setPostDislikes, clickedNum, setClickedNum, setLoginError) => {
      if (currentUser) {
         fetch(`/inc_likes/${id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"}
         })
            .then(resp => resp.json())
            .then(data => setPostLikes(data?.likes));

         if (clickedNum === 3) {
            fetch(`/dec_dislikes/${id}`, {
               method: "PATCH",
               headers: {"Content-Type": "application/json"}
            })
               .then(resp => resp.json())
               .then(data => setPostDislikes(data?.dislikes));
         }
         setClickedNum(2); 
      } else {
         setLoginError("Please login");
      }
   };

   // Function to handle disliking posts using the id of the disliked blog
   const handlePostDislikes = (id, setPostLikes, setPostDislikes, clickedNum, setClickedNum, setLoginError) => {
      if (currentUser) {
         fetch(`/inc_dislikes/${id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"}
         })
            .then(resp => resp.json())
            .then(data => setPostDislikes(data?.dislikes));

         if (clickedNum === 2) {
            fetch(`/dec_likes/${id}`, {
               method: "PATCH",
               headers: {"Content-Type": "application/json"}
            })
               .then(resp => resp.json())
               .then(data => setPostLikes(data?.likes));
         }
         setClickedNum(3);
      } else {
         setLoginError("Please login");
      }
   };

   const handleUnlikePost = (id, setPostLikes, setClickedNum) => {
      if (currentUser) {
         fetch(`/dec_likes/${id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"}
         })
            .then(resp => resp.json())
            .then(data => setPostLikes(data?.likes));
      }
      setClickedNum(1);
   };

   const handleUndislikePost = (id, setPostDislikes, setClickedNum) => {
      if (currentUser) {
         fetch(`/dec_dislikes/${id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"}
         })
            .then(resp => resp.json())
            .then(data => setPostDislikes(data?.dislikes));
      }
      setClickedNum(1);
   };


   // TESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTEST


   // State to handle whether to show Signup component or Login component
   const [showSignup, setShowSignup] = useState(false);

   // If isLoaded is still false, show Loader component
   if (!isLoaded) {
      return <Loader/>
   };

   return (
      <div className="App">
         
         <header className="fixed-navbar">
            {/* Hidden skip navigation button to try and help with accessibility; only really works on main page though :/ */}
            <a href="#main-content" id="skip-nav">Skip Navigation</a>

            <Navbar
               currentUser={currentUser}
               setCurrentUser={setCurrentUser}
               blogData={blogData}
               setBlogData={setBlogData}
               searchGreenit={searchGreenit}
               setShowSignup={setShowSignup}
            />
         </header>

         <main id="main-content">
            <Routes>

               <Route path="/" element={
                  <Posts
                     currentUser={currentUser}
                     blogData={blogData}
                     searchValue={searchValue}
                     handleDelete={handleDelete}
                     handlePostLikes={handlePostLikes}
                     handlePostDislikes={handlePostDislikes}
                     handleUnlikePost={handleUnlikePost}
                     handleUndislikePost={handleUndislikePost}
                  />
               }/>

               <Route path="/welcome" element={
                  <LoginSignupForm
                     currentUser={currentUser}
                     setCurrentUser={setCurrentUser}
                     setUserData={setUserData}
                     showSignup={showSignup}
                     setShowSignup={setShowSignup}
                  />
               }/>

               <Route path="/blogs/:id" element={
                  <PostDetails
                     currentUser={currentUser}
                     commentData={commentData}
                     setCommentData={setCommentData}
                     searchValue={searchValue}
                     handleDelete={handleDelete}
                     handlePostLikes={handlePostLikes}
                     handlePostDislikes={handlePostDislikes}
                     handleUnlikePost={handleUnlikePost}
                     handleUndislikePost={handleUndislikePost}
                  />
               }/>

               <Route path="/editing/:id" element={
                  <EditPost
                     currentUser={currentUser}
                     blogData={blogData}
                     setBlogData={setBlogData}
                  />
               }/>

               <Route path="/all_users" element={
                  <Users
                     userData={userData}
                     blogData={blogData}
                     commentData={commentData}
                     searchValue={searchValue}
                  />
               }/>

               <Route path="/all_users/:id" element={
                  <UserInfo
                     currentUser={currentUser}
                     setCurrentUser={setCurrentUser}
                     userData={userData}
                     setUserData={setUserData}
                     blogData={blogData}
                     setBlogData={setBlogData}
                     commentData={commentData}
                     setCommentData={setCommentData}
                     searchValue={searchValue}
                  />
               }/>

               <Route path="*" element={
                  <ErrorPage/>
               }/>

            </Routes>
         </main>

      </div>
   );
}

export default App;