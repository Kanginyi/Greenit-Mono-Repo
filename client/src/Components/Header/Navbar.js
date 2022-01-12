import React from 'react';
import {useHistory} from "react-router-dom";

import SearchBar from "./SearchBar";
import LogSign from "./LogSign";

import greenit_logo from "../../../public/greenit-logo.png";

function Navbar({search}) {
   const history = useHistory();

   const goHome = () => {
      let path = "/";
      history.push(path);
   }

   return (
      <nav className="nav">
         <a href="/" id="no-underline-pls">
            <span
               title="Greenit >:^("
               className="logo-box"
            >
               <img ig="greenit-logo" src={greenit_logo} alt="Greenit Logo"/>
               <h4>Greenit</h4>
            </span>
         </a>

         <SearchBar search={search}/>
         <LogSign/>
      </nav>
   );
}

export default Navbar;