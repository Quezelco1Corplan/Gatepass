import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ isSearchVisible, toggleSearch }) => {
  return (
    <div className={`search-bar ${isSearchVisible ? "show-search" : ""}`}>
      <input
        type="text"
        placeholder="Type something..."
        // value={search}
        // onChange={handleSearchChange}
      />
      <div className="search-button" onClick={toggleSearch}>
        <FontAwesomeIcon
          icon={faSearch}
          className={`search-icon ${isSearchVisible ? "hidden" : ""}`}
        />
        <FontAwesomeIcon
          icon={faTimes}
          className={`close-icon ${isSearchVisible ? "" : "hidden"}`}
        />
      </div>
    </div>
  );
};

export default SearchBar;
