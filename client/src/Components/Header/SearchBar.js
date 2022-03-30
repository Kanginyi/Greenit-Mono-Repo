import React from 'react';

function SearchBar({searchGreenit}) {
   return (
      <div className="search-bar">
         <input
            onChange={searchGreenit}
            type="text"
            placeholder="Search Greenit..."
         />
      </div>
   );
}

export default SearchBar;