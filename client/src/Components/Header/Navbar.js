import React, {useState} from 'react';
import "../../Stylings/Header.css";

import SearchBar from "./SearchBar";
import LogSign from "./LogSign";

import greenit_logo from "../../greenit-logo.png";

function Navbar({search}) {
   const [isClicked, setIsClicked] = useState(false);

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

            <p onClick={showSearch}>search</p>

            <LogSign/>
         </nav>

         {isClicked ? <SearchBar search={search}/> : null}
      </>
   );
}

export default Navbar;