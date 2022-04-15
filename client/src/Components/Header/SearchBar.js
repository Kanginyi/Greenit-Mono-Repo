import React from "react";

function SearchBar({searchGreenit}) {
   return (
      <div className="search-bar">
         <input
            onChange={searchGreenit}
            type="search"
            placeholder="Search Greenit..."
         />
      </div>
   );
}

export default SearchBar;