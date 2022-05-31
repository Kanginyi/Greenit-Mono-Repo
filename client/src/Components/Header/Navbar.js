import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

import CreatePost from "./CreatePost";
import LogSignButtons from "./LogSignButtons";
import SearchBar from "./SearchBar";

import {useDispatch, useSelector} from "react-redux";
import {toggleSearch} from "../../Redux/Features/booleanSlice";

import "../../Stylings/Header.css";

import greenit_logo from "../../Images/greenit-logo.png";

function Navbar({blogData, setBlogData, searchGreenit, setShowSignup}) {
   let navigate = useNavigate();
   const dispatch = useDispatch();

   const currentUser = useSelector(state => state.currentUser.value);

   // State to handle whether search bar is shown or not
   const searchClicked = useSelector(state => state.boolean.value);
   // State to handle whether CreatePost component is shown or not
   const [showCreateBlog, setShowCreateBlog] = useState(false);

   // Function to show or hide search bar when user clicks related button
   const showSearchBar = () => {
      dispatch(toggleSearch());
   };

   // Function to view random blog
   const viewRandomBlog = () => {
      // Map through blogData, grab each blog's ids, and return a new array with these ids
      const blogIDArray = blogData?.map(blog => blog?.id);

      // Grab a random number based on blogIDArray's length and use that number as the index to randomly select an ID inside of blogIDArray
      const randomBlogID = blogIDArray[Math.floor(Math.random() * blogIDArray?.length)];

      navigate(`/blogs/${randomBlogID}`);
   };

   return (
      <>
         <nav className="nav">
            <a href="/">
               <span
                  title="Greenit >:^("
                  className="logo-box"
               >
                  <img id="greenit-logo" src={greenit_logo} alt="Greenit Logo"/>
                  <h1>Greenit</h1>
               </span>
            </a>

            <div className="category-bar">
               <button onClick={showSearchBar}>Search</button>

               <button onClick={() => navigate("/all_users")}>All Users</button>

               <button onClick={viewRandomBlog}>Random Post</button>

               {/* Only render Create Post button if a user is logged in (the currentUser object exists) */}
               {currentUser &&
                  <button onClick={() => setShowCreateBlog(true)}>
                     Create Post
                  </button>
               }
            </div>

            <LogSignButtons
               setShowSignup={setShowSignup}
            />
         </nav>

         {searchClicked && <SearchBar searchGreenit={searchGreenit}/>}
         
         <CreatePost
            blogData={blogData}
            setBlogData={setBlogData}
            showCreateBlog={showCreateBlog}
            setShowCreateBlog={setShowCreateBlog}
         />
      </>
   );
}

export default Navbar;