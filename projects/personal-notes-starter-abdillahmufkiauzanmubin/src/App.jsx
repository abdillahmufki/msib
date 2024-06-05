// App.js
import React, { Component } from "react";
import Header from "./components/Header";
import NoteInput from "./components/NoteInput";
import NotesList from "./components/NotesList";
import { getInitialData, showFormattedDate } from "./utils"; // Import fungsi getInitialData dan showFormattedDate

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [], // Inisialisasi state notes dengan array kosong
      newNote: {
        id: "",
        title: "",
        body: "",
        archived: false,
        createdAt: "",
      },
      searchTerm: "",
    };
  }

  componentDidMount() {
    // Set state notes dengan data awal catatan menggunakan fungsi getInitialData
    this.setState({ notes: getInitialData() });
  }

  addNote = () => {
    const { newNote } = this.state;
    const id = +new Date();
    const createdAt = new Date().toISOString();
    const note = { ...newNote, id, createdAt };
    this.setState((prevState) => ({
      notes: [...prevState.notes, note],
      newNote: { id: "", title: "", body: "", archived: false, createdAt: "" },
    }));
  };

  deleteNote = (id) => {
    this.setState((prevState) => ({
      notes: prevState.notes.filter((note) => note.id !== id),
    }));
  };

  moveNote = (id) => {
    this.setState((prevState) => ({
      notes: prevState.notes.map((note) =>
        note.id === id ? { ...note, archived: !note.archived } : note
      ),
    }));
  };

  handleSearch = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  render() {
    const { notes, newNote, searchTerm } = this.state;
    const filteredNotes = notes.filter((note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const activeNotes = filteredNotes.filter((note) => !note.archived);
    const archivedNotes = filteredNotes.filter((note) => note.archived);

    return (
      <div className="App">
        <Header searchTerm={searchTerm} handleSearch={this.handleSearch} />
        <div className="note-app__input">
          <NoteInput
            newNote={newNote}
            setNewNote={(newNote) => this.setState({ newNote })}
            addNote={this.addNote}
          />
        </div>
        <div className="display">
          <NotesList
            notes={activeNotes}
            deleteNote={this.deleteNote}
            moveNote={this.moveNote}
            title="Catatan Aktif"
            showFormattedDate={showFormattedDate} // Pass showFormattedDate sebagai properti ke NotesList
          />
          <NotesList
            notes={archivedNotes}
            deleteNote={this.deleteNote}
            moveNote={this.moveNote}
            title="Arsip"
            showFormattedDate={showFormattedDate} // Pass showFormattedDate sebagai properti ke NotesList
          />
        </div>
      </div>
    );
  }
}

export default App;
