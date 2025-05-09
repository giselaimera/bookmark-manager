import React from "react";

const Search = ({ searchTitle, searchTerm }) => {
  return (
    <form action={searchTitle} className="mb-3">
      <div className="d-flex">
        <label htmlFor="search" className="form-label me-2">
          <i className="bi bi-search me-2" />
        </label>
        <input
          id="search"
          type="text"
          className="form-control"
          name="search"
          placeholder="Search for a title or tag..."
          defaultValue={searchTerm}
        />
      </div>
    </form>
  );
};
export default Search;
