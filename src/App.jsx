import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [bookmark, setBookmarks] = React.useState(
    JSON.parse(localStorage.getItem("bookmark")) || []
  );

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
    setBookmarks((prevBookmark) => [...prevBookmark, newBookmark]);
  };

  const deleteBookmark = (idToDelete) => {
    setBookmarks((prevBookmark) =>
      prevBookmark.filter((bookmark) => bookmark.id !== idToDelete)
    );
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">📌 Bookmark Manager</h1>
      <BookmarkForm addBookmark={addBookmark} />
      <BookmarkList bookmarks={bookmark} deleteBookmark={deleteBookmark} />
    </div>
  );
};

const BookmarkForm = ({ addBookmark }) => {
  return (
    <form action={addBookmark} className="mb-4">
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="form-control"
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
          placeholder="e.g., https://example.com"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="tag" className="form-label">
          Tag (optional)
        </label>
        <input type="text" id="tag" name="tag" className="form-control" />
      </div>
      <button type="submit" className="btn btn-primary">
        Add Bookmark
      </button>
    </form>
  );
};

const BookmarkList = ({ bookmarks, deleteBookmark }) => {
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
          />
        ))
      )}
    </div>
  );
};

const BookmarkItem = ({
  bookmark: { id, title, url, tag },
  deleteBookmark,
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
        <button
          className="btn btn-danger btn-sm"
          onClick={() => deleteBookmark(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default App;
