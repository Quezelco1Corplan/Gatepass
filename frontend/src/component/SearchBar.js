import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ isSearchVisible, toggleSearch, searchTerm, handleSearchChange}) => {
  return (
    <div className={`s-search-bar ${isSearchVisible ? "s-show-search" : ""}`}>
      <input
      id="search"
        type="text"
        placeholder="Type something..."
        value={searchTerm}
        onChange={handleSearchChange}
        // value={search}
        // onChange={handleSearchChange}
      />
      <div className="s-search-button" onClick={toggleSearch}>
        <FontAwesomeIcon
          icon={faSearch}
          className={`s-search-icon ${isSearchVisible ? "hidden" : ""}`}
        />
        <FontAwesomeIcon
          icon={faTimes}
          className={`s-close-icon ${isSearchVisible ? "" : "hidden"}`}
        />
      </div>
    </div>
  );
};

export default SearchBar;
