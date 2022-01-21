import React from 'react';
import "../../Stylings/Navbar.css";

import SearchBar from "./SearchBar";
import LogSign from "./LogSign";

import greenit_logo from "../../greenit-logo.png";

function Navbar({search}) {
   return (
      <nav className="nav">
         <a href="/" id="no-underline-pls">
            <span
               title="Greenit >:^("
               className="logo-box"
            >
               <img id="greenit-logo" src={greenit_logo} alt="Greenit Logo"/>
               <h4>Greenit</h4>
            </span>
         </a>

         <SearchBar search={search}/>
         <LogSign/>
      </nav>
   );
}

export default Navbar;