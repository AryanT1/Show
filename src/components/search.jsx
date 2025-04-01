import React from 'react';
import searchlogo from "../assets/search.svg"

const Search = ({searchTerm , setSearchTerm} ) => {
  return (
    <div className='search'>
     <div> 
        <img src={searchlogo} alt="search"/>
        <input 
        type='text'
        placeholder='Search through movies '
        value={searchTerm}
        onChange={(e)=>setSearchTerm(e.target.value)}/>
     </div>
    </div>
  )
}

export default Search
