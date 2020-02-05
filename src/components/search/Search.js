import React from 'react';
import './search.css'
import { useState } from 'react';

const Search = (props) => {
  return (
    <div className="form">
      <input 
          id="search-field"
          type="search" 
          placeholder="Search here"
          onChange={props.searchInput}
          required
      />
    </div> 
  );
}
 
export default Search;