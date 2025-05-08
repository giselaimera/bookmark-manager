import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const bookmarkReducer = (state, action) => {
  switch (action.type) {
    case "ADD_BOOKMARK":
      return [...state, action.payload];
    case "DELETE_BOOKMARK":
      return state.filter((bookmark) => bookmark.id !== action.payload);
    case "EDIT_BOOKMARK":
      return state.map((bookmark) =>
        bookmark.id === action.payload.id
          ? { ...bookmark, ...action.payload }
          : bookmark
      );
    default:
      return state;
  }
};

const App = () => {
  const [bookmark, dispatchBookmark] = React.useReducer(
    bookmarkReducer,
    JSON.parse(localStorage.getItem("bookmark")) || []
  );
  const [editingBookmark, setEditingBookmark] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  React.useEffect(() => {
    localStorage.setItem("bookmark", JSON.stringify(bookmark));
  }, [bookmark]);

  const addBookmark = (formData) => {
    const title = formData.get("title");
    const url = formData.get("url");
    const tag = formData.get("tag");

    const newBookmark = {
      id: Date.now(),
      title,
      url,
      tag,
    };
    dispatchBookmark({ type: "ADD_BOOKMARK", payload: newBookmark });
  };

  const deleteBookmark = (idToDelete) => {
    dispatchBookmark({ type: "DELETE_BOOKMARK", payload: idToDelete });
  };

  const editBookmark = (idToEdit) => {
    const bookmarkToEdit = bookmark.find((item) => item.id === idToEdit);
    setEditingBookmark(bookmarkToEdit);
    setShowModal(true);
  };

  const saveChanges = (formData) => {
    const editTitle = formData.get("title");
    const editUrl = formData.get("url");
    const editTag = formData.get("tag");

    const savedBookmark = {
      id: editingBookmark.id,
      title: editTitle,
      url: editUrl,
      tag: editTag,
    };
    dispatchBookmark({
      type: "EDIT_BOOKMARK",
      payload: savedBookmark,
    });
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const getFilteredBookmarks = () => {
    if (!searchTerm.trim()) return bookmark;
    return bookmark.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tag.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const searchText = (formData) => {
    const searchText = formData.get("search");
    setSearchTerm(searchText);
  };

  const filteredBookmarks = getFilteredBookmarks();

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">📌 Bookmark Manager</h1>
      <Search searchTitle={searchText} searchTerm={searchTerm} />
      <BookmarkForm
        addBookmark={addBookmark}
        showModal={showModal}
        saveChanges={saveChanges}
        editingBookmark={editingBookmark}
      />
      <BookmarkList
        bookmarks={filteredBookmarks}
        deleteBookmark={deleteBookmark}
        editBookmark={editBookmark}
      />
      {!showModal ? null : (
        <Modal
          showModal={showModal}
          saveChanges={saveChanges}
          closeModal={closeModal}
          editingBookmark={editingBookmark}
        />
      )}
    </div>
  );
};

const ActionButton = ({ type, className, label, onClick }) => {
  return (
    <button type={type} className={className} onClick={onClick}>
      {label}
    </button>
  );
};

const Modal = ({ showModal, saveChanges, closeModal, editingBookmark }) => {
  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Bookmark</h5>
            <ActionButton
              type="button"
              className="btn-close"
              onClick={() => closeModal()}
            />
          </div>
          <div className="modal-body">
            <BookmarkForm
              showModal={showModal}
              saveChanges={saveChanges}
              editingBookmark={editingBookmark}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const BookmarkForm = ({
  addBookmark,
  showModal,
  saveChanges,
  editingBookmark,
}) => {
  return (
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
  );
};

const BookmarkList = ({ bookmarks, deleteBookmark, editBookmark }) => {
  return (
    <div>
      <h2 className="mb-3">Your Bookmarks</h2>
      {bookmarks.length === 0 ? (
        <p className="text-muted">Nothing bookmarked yet.</p>
      ) : (
        bookmarks.map((bookmark) => (
          <BookmarkItem
            key={bookmark.id}
            bookmark={bookmark}
            deleteBookmark={deleteBookmark}
            editBookmark={editBookmark}
          />
        ))
      )}
    </div>
  );
};

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

export default App;
