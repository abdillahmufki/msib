import React from "react";
import NoteItem from "./NoteItem";

function NotesList({ notes, deleteNote, moveNote, title, showFormattedDate }) {
  return (
    <>
      <div>
        <h2>{title}</h2>
      </div>
      <div className="notes-list">
        {notes.length ? (
          notes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              deleteNote={deleteNote}
              moveNote={moveNote}
              showFormattedDate={showFormattedDate}
            />
          ))
        ) : (
          <p className="notes-list__empty-message">Tidak ada catatan</p>
        )}
      </div>
    </>
  );
}

export default NotesList;
