import React from "react";

const NoteHeader = (props) => {
  // console.log(props);

  const searchTexts = (e) => {
    const currentText = e.target.value;
    props.onSearch(currentText);
  };

  return (
    <header>
      <h1 className="app-header__title">Super Sticky Notes</h1>
      <aside>
        <button onClick={props.addNote} className="add-new">
          + New Note
        </button>
        <input
          className="search"
          type="text"
          placeholder="Type here to search..."
          value={props.searchText}
          onChange={searchTexts}
        />
      </aside>
    </header>
  );
};

export default NoteHeader;
