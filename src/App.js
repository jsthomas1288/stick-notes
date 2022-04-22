import React, { Component } from "react";
import NoteHeader from "./NoteHeader";
import NoteHistory from "./NoteHistory";
// import DarkMode from "./DarkMode";

class App extends Component {
  state = {
    notes: [],
    searchText: "",
    on: false
  };

  addNote = () => {
    // Create a new note
    const newNote = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true
    };
    // Adds the new note into the current notes array
    const newNotes = [newNote, ...this.state.notes];
    this.setState({ notes: newNotes });
  };

  onType = (editedId, updatedKey, updatedValue) => {
    // editedId => The id that has been edited
    // updatedKey => Determines if the title or the description field is being edited
    // updatedValue => What is being added to the title or description field
    const updatedNotes = this.state.notes.map((note) => {
      if (note.id !== editedId) {
        return note;
      } else {
        if (updatedKey === "title") {
          note.title = updatedValue;
          return note;
        } else {
          note.description = updatedValue;
          return note;
        }
      }
    });
    // update state and rerender with an empty input field
    this.setState({ notes: updatedNotes });
  };

  onSearch = (currentText) => {
    const newSearchText = currentText.toLowerCase();
    const searchNotes = this.state.notes.map((note) => {
      if (!newSearchText) {
        note.doesMatchSearch = true;
        return note;
      } else {
        const title = note.title.toLowerCase();
        const description = note.description.toLowerCase();
        const titleMatch = title.includes(newSearchText);
        const descriptionMatch = description.includes(newSearchText);
        const hasMatch = titleMatch || descriptionMatch;
        if (hasMatch) {
          note.doesMatchSearch = true;
        } else {
          note.doesMatchSearch = false;
        }
        return note;
      }
    });
    this.setState({ notes: searchNotes, searchText: newSearchText });
  };

  removeNote = (clickedIndex) => {
    const filterCallback = (_, index) => index !== clickedIndex;
    const newNotes = this.state.notes.filter(filterCallback);
    this.setState({ notes: newNotes });
  };

  // Saves the message from our component's state to the browser's local storage
  componentDidUpdate() {
    const savedNoteString = JSON.stringify(this.state.notes);
    localStorage.setItem("savedNotes", savedNoteString);
  }

  // Reads what's saved in the local storage
  componentDidMount() {
    const savedNoteString = localStorage.getItem("savedNotes");
    if (savedNoteString) {
      const savedNotes = JSON.parse(savedNoteString);
      this.setState({ notes: savedNotes });
    }
  }

  toggle = () => {
    const isOn = this.state.on;
    this.setState({ on: !isOn });
  };

  render() {
    let theme = "dark background";
    if (this.state.on) {
      theme = "light background";
    }
    return (
      <div className={theme}>
        <NoteHeader
          searchText={this.state.searchText}
          addNote={this.addNote}
          onSearch={this.onSearch}
        />
        <select className="dark-selection" onChange={this.toggle}>
          <option value="Dark">Dark</option>
          <option value="Light">Light</option>
        </select>
        <NoteHistory
          notes={this.state.notes}
          onType={this.onType}
          removeNote={this.removeNote}
        />
      </div>
    );
  }
}

export default App;
