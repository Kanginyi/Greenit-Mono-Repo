import React, {useEffect, useState} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";

import AllBlogs from "./Components/BlogRelated/AllBlogs";
import BlogDetails from "./Components/BlogRelated/BlogDetails";
import EditBlog from "./Components/BlogRelated/EditBlog";
import Navbar from "./Components/Header/Navbar";
import ErrorPage from "./Components/Helpers/ErrorPage";
import Loader from "./Components/Helpers/Loader";
import LoginSignupForm from "./Components/LoginSignup/LoginSignupForm";
import AllUsers from "./Components/UserRelated/AllUsers";
import UserInfo from "./Components/UserRelated/UserInfo";

import {useDispatch, useSelector} from "react-redux";
import {setCurrentUser} from "./Redux/Features/currentUserSlice";
import {setSearchValue} from "./Redux/Features/searchValueSlice";

function App() {
   let navigate = useNavigate();
   const dispatch = useDispatch();

   // State to handle current user's information
   const currentUser = useSelector(state => state.currentUser.value);

   // States to handle all initial blogs, users, and comments data
   const [blogData, setBlogData] = useState([]);
   const [userData, setUserData] = useState([]);
   const [commentData, setCommentData] = useState([]);

   // State to handle whether to show Loader component or not
   const [isLoaded, setIsLoaded] = useState(false);
   
   // Setting current user's information when someone logs in
   useEffect(() => {
      fetch("/me")
         .then(resp => {
            if (resp.ok) {
               resp.json()
                  .then(user => {
                     dispatch(setCurrentUser(user));
                  })
            }
         })
   }, [dispatch]);
   
   // Initial fetch for all blogs data
   useEffect(() => {
      fetch("/blogs")
         .then(resp => resp.json())
         .then(data => {
            setBlogData(data);
            setIsLoaded(true);
         });
   }, []);

   // Initial fetch for all users data
   useEffect(() => {
      fetch("/users")
         .then(resp => resp.json())
         .then(data => setUserData(data));
   }, []);
   
   // Initial fetch for all comments data
   useEffect(() => {
      fetch("/comments")
         .then(resp => resp.json())
         .then(data => setCommentData(data));
   }, []);

   // Function to update searchValue's state based on search bar's inputted values
   const searchGreenit = e => {
      dispatch(setSearchValue(e.target.value));
   };
    
   // Function to handle deleting blogs using the id of the deleted blog
   const handleDeleteBlog = id => {
      let confirmDelete = window.confirm("Are you sure you want to delete your post?");

      // If confirmDelete returns true (because a user clicked confirm), then continue with delete actions
      if (confirmDelete) {
         fetch(`/blogs/${id}`,{
            method : "DELETE"
         })
            .then(() => {
               // deleteBlog variable to hold array that removes the deleted blog from blogData and setBlogData to that new array
               const deleteBlog = blogData?.filter(blog => blog?.id !== id);
               setBlogData(deleteBlog);

               // deleteRelatedComments variable to hold array that removes the deleted blog's comments from commentData and setCommentData to that new array
               const deleteRelatedComments = commentData?.filter(comment => comment?.blog?.id !== id)
               setCommentData(deleteRelatedComments);
            })
         navigate("/");
      }
   };

   // Function to handle liking blogs using the id, related setter functions, and related state of the liked blo
   // If a user is already logged in (the currentUser object exists), then increment likes by 1 and setLikes to the updated number
   // If clickedNum state is 3 (where dislikes button is pressed), then also decrement dislikes by 1 and setDislikes to the updated number
   // setClickedNum to 2 (where likes button is pressed)
   // If a user isn't logged in (the currentUser object doesn't exist), then set and render "Please login"
   const handleBlogLikes = (id, setLikes, setDislikes, clickedNum, setClickedNum, setLoginError) => {
      if (currentUser) {
         fetch(`/inc_likes/${id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"}
         })
            .then(resp => resp.json())
            .then(data => setLikes(data?.likes));

         if (clickedNum === 3) {
            fetch(`/dec_dislikes/${id}`, {
               method: "PATCH",
               headers: {"Content-Type": "application/json"}
            })
               .then(resp => resp.json())
               .then(data => setDislikes(data?.dislikes));
         }
         setClickedNum(2); 
      } else {
         setLoginError("Please login");
      }
   };

   // Function to handle disliking blogs using the id, related setter functions, and related state of the disliked blog
   // If a user is already logged in (the currentUser object exists), then increment dislikes by 1 and setDislikes to the updated number
   // If clickedNum state is 2 (where likes button is pressed), then also decrement likes by 1 and setLikes to the updated number
   // setClickedNum to 3 (where dislikes button is pressed)
   // If a user isn't logged in (the currentUser object doesn't exist), then set and render "Please login"
   const handleBlogDislikes = (id, setLikes, setDislikes, clickedNum, setClickedNum, setLoginError) => {
      if (currentUser) {
         fetch(`/inc_dislikes/${id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"}
         })
            .then(resp => resp.json())
            .then(data => setDislikes(data?.dislikes));

         if (clickedNum === 2) {
            fetch(`/dec_likes/${id}`, {
               method: "PATCH",
               headers: {"Content-Type": "application/json"}
            })
               .then(resp => resp.json())
               .then(data => setLikes(data?.likes));
         }
         setClickedNum(3);
      } else {
         setLoginError("Please login");
      }
   };

   // Function to handle unliking blogs using the id and related setter functions of the unliked blog
   // If blog is already liked, decrement likes by 1 and setLikes to the updated number
   // setClickedNum to 1 (where neither button is pressed)
   const handleUnlikeBlog = (id, setLikes, setClickedNum) => {
      if (currentUser) {
         fetch(`/dec_likes/${id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"}
         })
            .then(resp => resp.json())
            .then(data => setLikes(data?.likes));
      }
      setClickedNum(1);
   };

   // Function to handle undisliking blogs using the id and related setter functions of the undisliked blog
   // If blog is already disliked, decrement dislikes by 1 and setDislikes to the updated number
   // setClickedNum to 1 (where neither button is pressed)
   const handleUndislikeBlog = (id, setDislikes, setClickedNum) => {
      if (currentUser) {
         fetch(`/dec_dislikes/${id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"}
         })
            .then(resp => resp.json())
            .then(data => setDislikes(data?.dislikes));
      }
      setClickedNum(1);
   };

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
               blogData={blogData}
               setBlogData={setBlogData}
               searchGreenit={searchGreenit}
            />
         </header>

         <main id="main-content">
            <Routes>

               <Route path="/" element={
                  <AllBlogs
                     blogData={blogData}
                     handleDeleteBlog={handleDeleteBlog}
                     handleBlogLikes={handleBlogLikes}
                     handleBlogDislikes={handleBlogDislikes}
                     handleUnlikeBlog={handleUnlikeBlog}
                     handleUndislikeBlog={handleUndislikeBlog}
                  />
               }/>

               <Route path="/welcome" element={
                  <LoginSignupForm
                     setUserData={setUserData}
                  />
               }/>

               <Route path="/blogs/:id" element={
                  <BlogDetails
                     commentData={commentData}
                     setCommentData={setCommentData}
                     handleDeleteBlog={handleDeleteBlog}
                     handleBlogLikes={handleBlogLikes}
                     handleBlogDislikes={handleBlogDislikes}
                     handleUnlikeBlog={handleUnlikeBlog}
                     handleUndislikeBlog={handleUndislikeBlog}
                  />
               }/>

               <Route path="/editing/:id" element={
                  <EditBlog
                     blogData={blogData}
                     setBlogData={setBlogData}
                  />
               }/>

               <Route path="/all_users" element={
                  <AllUsers
                     userData={userData}
                     blogData={blogData}
                     commentData={commentData}
                  />
               }/>

               <Route path="/all_users/:id" element={
                  <UserInfo
                     userData={userData}
                     setUserData={setUserData}
                     blogData={blogData}
                     setBlogData={setBlogData}
                     commentData={commentData}
                     setCommentData={setCommentData}
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