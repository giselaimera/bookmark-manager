import React from "react";
const Sort = ({ handleSort }) => {
  return (
    <>
      <div className="mb-3">
        <label htmlFor="sortSelect" className="form-label">
          Sort by Title
        </label>
        <select
          id="sortSelect"
          className="form-select"
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="">Sort by Title</option>
          <option value="asc">A → Z</option>
          <option value="desc">Z → A</option>
        </select>
      </div>
    </>
  );
};
export default Sort;
