import React from "react";
import SearchBar from "./SearchBar";

function Header({ searchTerm, handleSearch }) {
  return (
    <div className="note-app__header">
      <h1>Aplikasi Catatan Pribadi</h1>
      <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
    </div>
  );
}

export default Header;
