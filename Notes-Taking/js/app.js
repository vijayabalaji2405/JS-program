import NotesView from "./notesView.js";
import NotesApi from "./notesApi.js";

export default class App {
  constructor(root) {
    this.note = [];
    this.activeNote = null;
    this.view = new NotesView(root, this._handler());
    this._refreshNotes();
  }

  _refreshNotes() {
    //getting all localstorage notes
    const notes = NotesApi.getAllNotes();

    this._setNotes(notes);

    if (notes.length > 0) {
      this._setActiveNote(notes[0]);
    }
  }

  _setNotes(notes) {
    this.note = notes;
    this.view.updateNoteList(notes);
    this.view.updateNotePreviewVisibility(notes);
  }

  _setActiveNote(note) {
    console.log(note);
    this.activeNote = note;
    this.view.updateActiveNote(note);
  }

  _handler() {
    return {
      onNoteSelect: (noteId) => {
        const selectedNote = this.note.find((note) => note.id == noteId);
        this._setActiveNote(selectedNote);
      },
      onNoteAdd: () => {
        const newNote = {
          title: "New Note",
          body: "Take Notes...",
        };
        //saving note to local storage
        NotesApi.saveNote(newNote);
        //changes updated
        this._refreshNotes();
      },
      onNoteEdit: (title, body) => {
        NotesApi.saveNote({
          id: this.activeNote.id,
          title,
          body,
        });
      },
      onNoteDelete: (noteId) => {
        NotesApi.deleteNote(noteId);
        this._refreshNotes();
      },
    };
  }
}
