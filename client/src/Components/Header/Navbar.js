import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

import CreatePost from "./CreatePost";
import LogSignButtons from "./LogSignButtons";
import SearchBar from "./SearchBar";

import {useDispatch, useSelector} from "react-redux";
import {setShowCreateBlog} from "../../Redux/Features/showCreateBlogSlice";

import "../../Stylings/Header.css";

import greenit_logo from "../../Images/greenit-logo.png";

function Navbar({blogData, setBlogData, searchGreenit}) {
   let navigate = useNavigate();
   const dispatch = useDispatch();

   // State to handle current user's information
   const currentUser = useSelector(state => state.currentUser.value);

   // State to handle whether search bar is shown or not
   const [searchClicked, setSearchClicked] = useState(false);

   // Function to show or hide search bar when user clicks related button
   const showSearchBar = () => {
      setSearchClicked(prev => !prev);
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
               <button onClick={showSearchBar} className="cursor-pointer">Search</button>

               <button onClick={() => navigate("/all_users")} className="cursor-pointer">All Users</button>

               <button onClick={viewRandomBlog} className="cursor-pointer">Random Post</button>

               {/* Only render Create Post button if a user is logged in (the currentUser object exists) */}
               {currentUser &&
                  <button
                     onClick={() => dispatch(setShowCreateBlog(true))}
                     className="cursor-pointer"
                  >
                     Create Post
                  </button>
               }
            </div>

            <LogSignButtons/>
         </nav>

         {searchClicked && <SearchBar searchGreenit={searchGreenit}/>}
         
         <CreatePost
            blogData={blogData}
            setBlogData={setBlogData}
         />
      </>
   );
}

export default Navbar;