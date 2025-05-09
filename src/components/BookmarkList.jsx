import React from "react";
import Sort from "./Sort";
import BookmarkItem from "./BookmarkItem";

const BookmarkList = ({
  bookmarks,
  deleteBookmark,
  editBookmark,
  handleSort = { handleSort },
}) => {
  return (
    <div>
      <h2 className="mb-3">Your Bookmarks</h2>
      <Sort handleSort={handleSort} />

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
export default BookmarkList;
