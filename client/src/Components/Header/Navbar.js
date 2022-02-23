import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import "../../Stylings/Header.css";

import SearchBar from "./SearchBar";
import LogSign from "./LogSign";
import Form from "../../Components/Main/Form";

import greenit_logo from "../../greenit-logo.png";

function Navbar({search, handleAddPost, setShowSignup}) {
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

               <button onClick={() => setShowForm(true)}>Create Post</button>

               <button onClick={() => navigate("/users")}>All Users</button>
            </div>

            <LogSign setShowSignup={setShowSignup}/>
         </nav>

         {isClicked ? <SearchBar search={search}/> : null}
         
         <Form
            showForm={showForm}
            setShowForm={setShowForm}
            handleAddPost={handleAddPost}
         />
      </>
   );
}

export default Navbar;