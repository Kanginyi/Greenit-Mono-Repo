import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import "../../Stylings/Header.css";

import SearchBar from "./SearchBar";
import LogSign from "./LogSign";
import Form from "../../Components/Main/Form";

import greenit_logo from "../../greenit-logo.png";

function Navbar({search, handleAddPost}) {
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

            <div style={{display: "flex"}}>
               <p onClick={showSearch}>Search</p>

               <p onClick={() => setShowForm(true)}>Create Post</p>

               <p onClick={() => navigate("/users")}>All Users</p>
            </div>

            <LogSign/>
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