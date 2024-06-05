import React from "react";

function SearchBar({ searchTerm, handleSearch }) {
  return (
    <input
      type="text"
      placeholder="Cari catatan..."
      value={searchTerm}
      onChange={handleSearch}
      className="note-search"
    />
  );
}

export default SearchBar;
