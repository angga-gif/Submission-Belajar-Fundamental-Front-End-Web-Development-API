// Custom Element 1: <app-bar>
class AppBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background-color: #333;
          color: #fff;
          padding: 20px;
          text-align: center;
        }
      </style>
      <slot></slot>
    `;
  }
}

customElements.define('app-bar', AppBar);

// Custom Element 2: <note-input>
class NoteInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        label {
          display: block;
          margin-bottom: 5px;
        }

        input,
        textarea {
          width: 100%;
          padding: 8px;
          margin-bottom: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        button {
          background-color: #4CAF50;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
      </style>
      <label for="title">Title:</label>
      <input type="text" id="title" name="title">
      <label for="body">Body:</label>
      <textarea id="body" name="body"></textarea>
      <button type="button" id="addNoteBtn">Add Note</button>
    `;

    const addNoteBtn = this.shadowRoot.getElementById('addNoteBtn');
    addNoteBtn.addEventListener('click', () => {
      const titleInput = this.shadowRoot.getElementById('title');
      const bodyInput = this.shadowRoot.getElementById('body');
      addNote(titleInput.value, bodyInput.value);
      titleInput.value = '';
      bodyInput.value = '';
    });
  }
}

customElements.define('note-input', NoteInput);

// Custom Element 3: <note-card>
class NoteCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .note-card {
          background-color: #f5f5f5;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
        }
        .note-card h3 {
          margin-top: 0;
        }
        .note-card p {
          margin-bottom: 10px;
        }
        .note-card .actions {
          display: flex;
          justify-content: flex-end;
        }
        .note-card .actions button {
          margin-left: 10px;
        }
      </style>
      <div class="note-card">
        <h3></h3>
        <p></p>
        <div class="actions">
          <button id="archiveBtn">Archive</button>
          <button id="deleteBtn">Delete</button>
        </div>
      </div>
    `;

    const archiveBtn = this.shadowRoot.getElementById('archiveBtn');
    const deleteBtn = this.shadowRoot.getElementById('deleteBtn');

    archiveBtn.addEventListener('click', () => {
      const archived = this.getAttribute('archived') === 'true';
      handleArchiveNote(this.getAttribute('id'), archived);
    });

    deleteBtn.addEventListener('click', () => {
      showLoadingIndicator();
      deleteNote(this.getAttribute('id'))
        .then(() => fetchNotes())
        .then(notes => {
          hideLoadingIndicator();
          renderNotes(notes);
        })
        .catch(error => {
          hideLoadingIndicator();
          console.error('Error deleting note:', error);
        });
    });
  }

  static get observedAttributes() {
    return ['title', 'body', 'archived'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'title') {
      console.log('Setting title:', newValue);
      this.shadowRoot.querySelector('h3').textContent = newValue;
    } else if (name === 'body') {
      console.log('Setting body:', newValue);
      this.shadowRoot.querySelector('p').textContent = newValue;
    } else if (name === 'archived') {
      // ...
    }
  }
}

customElements.define('note-card', NoteCard);