  import React, { useRef } from "react";

export const SearchBar = ({ setTerms }) => {
  const { terms } = useRef();

  return (
    
      <div className="searchBar" >
        <input
          onKeyUp={(e) => setTerms(e.target.value)}
          type="text"
          id="searchTerms"
          ref={terms}
          required
          autoFocus
          placeholder="Search Review By UserProfiles"
          className="form-control"
        />
      </div>
  );
};
