import React, { useState } from "react";
import "./cssFiles/searchBar.css";
import Button from "@material-ui/core/Button";
function SearchBar(props) {
  const [searchQuery, setsearchQuery] = useState("");

  function onSubmitSearch(e) {
    e.preventDefault();
    props.getSearch(searchQuery);
  }

  return (
    <form onSubmit={onSubmitSearch} className="searchbar" action="">
      <input
        className="searchbarInput"
        onChange={(e) => {
          setsearchQuery(e.target.value);
        }}
        placeholder="Search all News"
        type="text"
        value={searchQuery}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className="searchbarButton"
      >
        Search
      </Button>
    </form>
  );
}

export default SearchBar;
// getSearch;
