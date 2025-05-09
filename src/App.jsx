import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Search from "./components/Search";
import Modal from "./components/Modal";
import BookmarkList from "./components/BookmarkList";
import BookmarkForm from "./components/BookmarkForm";

const themeColors = {
  light: {
    background: "#f8f9fa",
    containerBg: "#ffffff",
    cardBg: "#ffffff",
    text: "#212529",
    accent: "#4361ee",
    buttonBg: "#f8f9fa",
    buttonText: "#212529",
    border: "#dee2e6",
  },
  dark: {
    background: "#121212",
    containerBg: "#1e1e1e",
    cardBg: "#2d2d2d",
    text: "#e0e0e0",
    accent: "#4895ef",
    buttonBg: "#2d2d2d",
    buttonText: "#e0e0e0",
    border: "#444444",
  },
};

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
    case "SORT_BY_TITLE":
      const sorted = [...state].sort((a, b) => {
        if (action.payload === "asc") return a.title.localeCompare(b.title);
        if (action.payload === "desc") return b.title.localeCompare(a.title);
        return 0;
      });
      return sorted;
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
  const [theme, setTheme] = React.useState(
    localStorage.getItem("theme") || "light"
  );

  const colors = themeColors[theme];

  React.useEffect(() => {
    document.body.setAttribute("data-bs-theme", theme);
    document.body.style.backgroundColor = colors.background;
    document.body.style.color = colors.text;
    localStorage.setItem("theme", theme);
  }, [theme, colors]);

  React.useEffect(() => {
    localStorage.setItem("bookmark", JSON.stringify(bookmark));
  }, [bookmark]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

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

  const handleSort = (order) => {
    dispatchBookmark({
      type: "SORT_BY_TITLE",
      payload: order,
    });
  };

  const filteredBookmarks = getFilteredBookmarks();

  const toggleButtonStyle = {
    backgroundColor: theme === "light" ? "#e9ecef" : "#2d2d2d",
    color: theme === "light" ? "#212529" : "#e0e0e0",
    border: "none",
    borderRadius: "50%",
    width: "46px",
    height: "46px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "all 0.3s ease",
    boxShadow:
      theme === "light"
        ? "0 2px 5px rgba(0,0,0,0.1)"
        : "0 2px 5px rgba(0,0,0,0.3)",
  };

  const containerStyle = {
    backgroundColor: colors.containerBg,
    borderRadius: "12px",
    padding: "20px",
    boxShadow:
      theme === "light"
        ? "0 4px 6px rgba(0,0,0,0.05)"
        : "0 4px 6px rgba(0,0,0,0.2)",
    border: `1px solid ${colors.border}`,
    transition: "all 0.3s ease",
    height: "100%",
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 style={{ color: colors.text, fontWeight: "600" }}>
          📌 Bookmark Manager
        </h1>
        <button
          className="btn"
          onClick={toggleTheme}
          style={toggleButtonStyle}
          aria-label={
            theme === "light" ? "Switch to dark mode" : "Switch to light mode"
          }
        >
          {theme === "light" ? (
            <i className="bi bi-moon-fill"></i>
          ) : (
            <i className="bi bi-brightness-high-fill"></i>
          )}
        </button>
      </div>

      <div className="text-center mb-4">
        <Search searchTitle={searchText} searchTerm={searchTerm} />
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <div style={containerStyle}>
            <BookmarkForm
              addBookmark={addBookmark}
              showModal={showModal}
              saveChanges={saveChanges}
              editingBookmark={editingBookmark}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div
            style={{
              ...containerStyle,
              maxHeight: "500px",
              overflowY: filteredBookmarks.length > 2 ? "auto" : "hidden",
            }}
          >
            <BookmarkList
              bookmarks={filteredBookmarks}
              deleteBookmark={deleteBookmark}
              editBookmark={editBookmark}
              handleSort={handleSort}
            />
          </div>
        </div>
      </div>

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

export default App;
