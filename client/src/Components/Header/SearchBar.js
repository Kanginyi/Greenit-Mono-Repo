import React from 'react';

function SearchBar({search}) {
   return (
      <form className="searchbar">
         <input
            onChange={search}
            type="text"
            placeholder="Search Greenit"
         />
      </form>
   );
}

export default SearchBar;