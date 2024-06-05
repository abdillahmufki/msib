// components/DeleteButton.js
import React from "react";

function DeleteButton({ noteId, deleteNote }) {
  const handleClick = () => {
    deleteNote(noteId); // Memanggil fungsi deleteNote dengan ID catatan sebagai argumen
  };

  return (
    <button className="note-item__delete-button" onClick={handleClick}>
      Hapus
    </button>
  );
}

export default DeleteButton;
