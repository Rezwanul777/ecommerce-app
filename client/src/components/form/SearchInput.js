import React from 'react';
import { useSearch } from '../../context/search';

const SearchInput = () => {
   const [values,setValues]=useSearch()
   return (
      <div>
         <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" 
        type="submit" value={values.keyword} onChange={(e)=>setValues({...values,keyword:e.target.value})}
        >Search</button>
      </form>

      </div>
   );
};

export default SearchInput;