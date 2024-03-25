import { fetchNotes, createNote, deleteNote, archiveNote, unarchiveNote } from './api.js';
import { showLoadingIndicator, hideLoadingIndicator } from './loading-indicator.js';

const notesContainer = document.getElementById('notesContainer');

function renderNotes(notes) {
  console.log('Rendering notes:', notes);
  notesContainer.innerHTML = '';
  notes.forEach(note => {
    const noteCard = document.createElement('note-card');
    noteCard.setAttribute('title', note.title);
    noteCard.setAttribute('body', note.body);
    noteCard.setAttribute('id', note.id);
    noteCard.setAttribute('archived', note.archived);
    notesContainer.appendChild(noteCard);
  });
}

function addNote(title, body) {
  if (title && body) {
    showLoadingIndicator();
    createNote(title, body)
      .then(response => response.json())
      .then(data => {
        hideLoadingIndicator();
        renderNotes([...notesData, data.data]);
      })
      .catch(error => {
        hideLoadingIndicator();
        console.error('Error creating note:', error);
      });
  }
}

function handleArchiveNote(noteId, archived) {
  showLoadingIndicator();
  if (archived) {
    unarchiveNote(noteId)
      .then(() => fetchNotes())
      .then(notes => {
        hideLoadingIndicator();
        renderNotes(notes);
      })
      .catch(error => {
        hideLoadingIndicator();
        console.error('Error unarchiving note:', error);
      });
  } else {
    archiveNote(noteId)
      .then(() => fetchNotes())
      .then(notes => {
        hideLoadingIndicator();
        renderNotes(notes);
      })
      .catch(error => {
        hideLoadingIndicator();
        console.error('Error archiving note:', error);
      });
  }
}

function handleDeleteNote(noteId) {
  showLoadingIndicator();
  deleteNote(noteId)
    .then(() => fetchNotes())
    .then(notes => {
      hideLoadingIndicator();
      renderNotes(notes);
    })
    .catch(error => {
      hideLoadingIndicator();
      console.error('Error deleting note:', error);
    });
}

showLoadingIndicator();
fetchNotes()
  .then(notes => {
    hideLoadingIndicator();
    renderNotes(notes);
  })
  .catch(error => {
    hideLoadingIndicator();
    console.error('Error fetching notes:', error);
  });