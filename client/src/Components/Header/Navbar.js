import React from 'react';
import "../../Stylings/Navbar.css";

import SearchBar from "./SearchBar";
import LogSign from "./LogSign";

import greenit_logo from "../../greenit-logo.png";

function Navbar({search}) {
   return (
      <nav className="nav">
         <a href="/">
            <span
               title="Greenit >:^("
               className="logo-box"
            >
               <img id="greenit-logo" src={greenit_logo} alt="Greenit Logo"/>
               <p>Greenit</p>
            </span>
         </a>

         <SearchBar search={search}/>
         <LogSign/>
      </nav>
   );
}

export default Navbar;