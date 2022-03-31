import React, {useState} from "react";

import CreatePost from "./CreatePost";
import LogSignButtons from "./LogSignButtons";
import SearchBar from "./SearchBar";

import {useNavigate} from "react-router-dom";

import "../../Stylings/Header.css";

import greenit_logo from "../../Images/greenit-logo.png";

function Navbar({currentUser, setCurrentUser, postData, setPostData, searchGreenit, setShowSignup}) {
   let navigate = useNavigate();

   // State to handle whether search bar is shown or not
   const [searchClicked, setSearchClicked] = useState(false);
   // State to handle whether CreatePost component is shown or not
   const [showCreatePost, setShowCreatePost] = useState(false);

   // Function to show or hide search bar when user clicks related button
   const showSearchBar = () => {
      setSearchClicked(prev => !prev);
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

               <button onClick={() => navigate(`/blogs/${Math.floor(Math.random() * postData?.length) + 1}`)}>Random Post</button>

               {/* Only show create post button if currentUser object exists */}
               {currentUser ? <button onClick={() => setShowCreatePost(true)}>Create Post</button> : null}
            </div>

            <LogSignButtons
               currentUser={currentUser}
               setCurrentUser={setCurrentUser}
               setShowSignup={setShowSignup}
            />
         </nav>

         {searchClicked ? <SearchBar searchGreenit={searchGreenit}/> : null}
         
         <CreatePost
            currentUser={currentUser}
            postData={postData}
            setPostData={setPostData}
            showCreatePost={showCreatePost}
            setShowCreatePost={setShowCreatePost}
         />
      </>
   );
}

export default Navbar;