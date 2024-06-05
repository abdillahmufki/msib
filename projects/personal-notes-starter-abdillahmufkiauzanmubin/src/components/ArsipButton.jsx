// components/ArsipButton.js
import React from "react";

function ArsipButton({ note, moveNote }) {
  const handleClick = () => {
    moveNote(note.id); // Memanggil fungsi moveNote dengan ID catatan sebagai argumen
  };

  return (
    <button className="note-item__archive-button" onClick={handleClick}>
      {note && note.archived ? "Pindahkan" : "Arsipkan"}
    </button>
  );
}

export default ArsipButton;
