import React from 'react';

function SearchBar({searchGreenit}) {
   return (
      <form className="searchbar">
         <input
            onChange={searchGreenit}
            type="text"
            placeholder="Search Greenit..."
         />
      </form>
   );
}

export default SearchBar;