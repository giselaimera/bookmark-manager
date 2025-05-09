import React from "react";
import ActionButton from "./ActionButton";
import BookmarkForm from "./BookmarkForm";

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
export default Modal;
