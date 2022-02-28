import React, {useState} from 'react';
import SearchBar from "./SearchBar";
import LogSignButtons from "./LogSignButtons";
import Form from "../../Components/Main/Form";

import {useNavigate} from "react-router-dom";
import "../../Stylings/Header.css";

import greenit_logo from "../../greenit-logo.png";

function Navbar({currentUser, setCurrentUser, search, postData, setPostData, setShowSignup, numbersOfBlogs}) {
   const [isClicked, setIsClicked] = useState(false);
   const [showForm, setShowForm] = useState(false);

   let navigate = useNavigate();

   const showSearch = () => {
      setIsClicked(prev => !prev)
   }

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
               <button onClick={showSearch}>Search</button>

               <button onClick={() => navigate("/users")}>All Users</button>

               <button onClick={() => navigate(`/blogs/${Math.floor(Math.random() * numbersOfBlogs) + 1}`)}>Random Post</button>

               {currentUser ? <button onClick={() => setShowForm(true)}>Create Post</button> : null}
            </div>

            <LogSignButtons
               currentUser={currentUser}
               setCurrentUser={setCurrentUser}
               setShowSignup={setShowSignup}/>
         </nav>

         {isClicked ? <SearchBar search={search}/> : null}
         
         <Form
            currentUser={currentUser}
            showForm={showForm}
            setShowForm={setShowForm}
            postData={postData}
            setPostData={setPostData}
         />
      </>
   );
}

export default Navbar;