import React from "react";
import ActionButton from "./ActionButton";

const BookmarkForm = ({
  addBookmark,
  showModal,
  saveChanges,
  editingBookmark,
}) => {
  return (
    <>
      <h2 className="mb-5">New Bookmark</h2>
      <form action={showModal ? saveChanges : addBookmark} className="mb-4">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            defaultValue={showModal ? editingBookmark?.title : ""}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="url" className="form-label">
            URL
          </label>
          <input
            type="url"
            id="url"
            name="url"
            className="form-control"
            defaultValue={showModal ? editingBookmark?.url : ""}
            placeholder="e.g., https://example.com"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag (optional)
          </label>
          <input
            type="text"
            id="tag"
            name="tag"
            className="form-control"
            defaultValue={showModal ? editingBookmark?.tag : ""}
          />
        </div>
        {!showModal ? (
          <ActionButton
            type="submit"
            className="btn btn-primary"
            label={
              <>
                <i className="bi bi-house me-1" />
                Add Bookmark
              </>
            }
          />
        ) : (
          <ActionButton
            type="submit"
            className="btn btn-primary"
            label={
              <>
                <i className="bi bi-floppy-fill me-1" />
                Save Changes
              </>
            }
          />
        )}
      </form>
    </>
  );
};
export default BookmarkForm;
