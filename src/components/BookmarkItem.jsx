import React from "react";
import ActionButton from "./ActionButton";

const BookmarkItem = ({
  bookmark: { id, title, url, tag },
  deleteBookmark,
  editBookmark,
}) => {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">
          <a href={url} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </h5>
        <p className="card-text mb-1">
          <strong>URL:</strong> {url}
        </p>
        <p className="card-text mb-2">
          <strong>Tag:</strong> {tag ? tag : "No tag provided"}
        </p>
        <ActionButton
          type="button"
          className="btn btn-danger btn-sm me-2"
          label={
            <>
              <i className="bi bi-trash me-1"></i> Delete
            </>
          }
          onClick={() => deleteBookmark(id)}
        />
        <ActionButton
          type="button"
          className="btn btn-secondary btn-sm"
          label={
            <>
              <i className="bi bi-pencil me-1"></i> Edit
            </>
          }
          onClick={() => editBookmark(id)}
        />
      </div>
    </div>
  );
};
export default BookmarkItem;
