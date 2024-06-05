import React, { useState } from "react";

function NoteInput({ newNote, setNewNote, addNote }) {
  const [remainingChars, setRemainingChars] = useState(50);

  const handleTitleChange = (e) => {
    const inputText = e.target.value;
    const remaining = 50 - inputText.length;
    if (remaining >= 0) {
      setRemainingChars(remaining);
      setNewNote({ ...newNote, title: inputText });
    }
  };

  const handleBodyChange = (e) => {
    setNewNote({ ...newNote, body: e.target.value });
  };

  const addNoteHandler = () => {
    addNote();
    setNewNote({
      id: "",
      title: "",
      body: "",
      archived: false,
      createdAt: "",
    });
    setRemainingChars(50);
  };

  return (
    <div className="note-input">
      <h2 className="note-input__title">Tambah Catatan Baru</h2>
      <div>
        <p className="note-input__title__char-limit">
          Sisa karakter: {remainingChars}
        </p>
        <input
          type="text"
          placeholder="Judul"
          value={newNote.title}
          onChange={handleTitleChange}
        />
        <textarea
          placeholder="Isi catatan"
          value={newNote.body}
          onChange={handleBodyChange}
          className="note-input__body"
        ></textarea>
        <button onClick={addNoteHandler} className="note-input__button">
          Tambah Catatan
        </button>
      </div>
    </div>
  );
}

export default NoteInput;
