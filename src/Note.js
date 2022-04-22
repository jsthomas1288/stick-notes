import React from "react";

const Note = (props) => {
  // console.log(props);

  const updateTitle = (e) => {
    const updatedValue = e.target.value;
    const editedId = props.note.id;
    props.onType(editedId, "title", updatedValue);
  };

  const updateDescription = (e) => {
    const updatedValue = e.target.value;
    const editedId = props.note.id;
    props.onType(editedId, "description", updatedValue);
  };

  const deleteByIndex = () => props.removeNote(props.index);

  return (
    <li className="note">
      <input
        className="note__title"
        type="text"
        placeholder="Title"
        value={props.note.title}
        onChange={updateTitle}
      />
      <textarea
        className="note__description"
        placeholder="Description..."
        value={props.note.description}
        onChange={updateDescription}
      />
      <span onClick={deleteByIndex} className="note__delete">
        X
      </span>
    </li>
  );
};

export default Note;
