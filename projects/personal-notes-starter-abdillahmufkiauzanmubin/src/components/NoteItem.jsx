import React from "react";
import ArsipButton from "./ArsipButton";
import DeleteButton from "./DeleteButton";

function NoteItem({ note, deleteNote, moveNote, showFormattedDate }) {
  const formattedDate = showFormattedDate(note.createdAt);

  return (
    <div className="note-item">
      <div className="note-item__content">
        <h2 className="note-item__title">{note.title}</h2>
        <p className="note-item__date">{formattedDate}</p>{" "}
        <p className="note-item__body">{note.body}</p>
      </div>
      <div className="note-item__action">
        <DeleteButton noteId={note.id} deleteNote={deleteNote} />
        <ArsipButton note={note} moveNote={moveNote} />
      </div>
    </div>
  );
}

export default NoteItem;
