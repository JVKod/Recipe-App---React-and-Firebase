import React from "react";
import './SearchBar.css';

function SearchBar() {
    return (
      <div>
        <input 
            type='text'
            placeholder="Look for a recipe..."
            className="searchBarStyle"    
        />
      </div>
    );
}
  
export default SearchBar;