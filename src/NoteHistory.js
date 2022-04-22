import React from "react";
import Note from "./Note";

const NoteHistory = (props) => {
  const noteFilter = (note) => note.doesMatchSearch;
  const filterResult = props.notes.filter(noteFilter);
  const renderNote = (note, index) => (
    <Note
      note={note}
      key={note.id}
      onType={props.onType}
      removeNote={props.removeNote}
      index={index}
    />
  );
  const noteElements = filterResult.map(renderNote);
  return <ul className="notes-list">{noteElements}</ul>;
};

export default NoteHistory;
