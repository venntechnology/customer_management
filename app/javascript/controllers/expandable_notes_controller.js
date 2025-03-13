import { Controller } from "@hotwired/stimulus"

let currentEditingNoteId = null;

export default class extends Controller {
  static values = {
    customerId: Number,
    userId: Number
  }

  static targets = [
    "form",
    "input",
    "showFormButton",
    "notesList",
    "emptyMessage"
  ]

  connect() {
    window.expandableNotesController = this;
  }

  toggleForm(event) {
    // Toggle form visibility
    this.formTarget.classList.toggle('show');

    // Toggle button visibility
    this.showFormButtonTarget.classList.toggle('d-none');

    // Clear input when hiding form
    if (!this.formTarget.classList.contains('show')) {
      this.inputTarget.value = '';
    }
  }

  addNote(event) {
    const content = this.inputTarget.value;

    if (!content.trim()) {
      alert("Note cannot be empty!");
      return;
    }

    // Clear input
    this.inputTarget.value = '';

    // Hide form and show button
    this.formTarget.classList.remove('show');
    this.showFormButtonTarget.classList.remove('d-none');

    fetch(`/customers/${this.customerIdValue}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': this.getCSRFToken()
      },
      body: JSON.stringify({
        note: {
          content: content
        }
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data.success) {
        this.appendNoteToList(data.note);

        // Remove "No notes yet" message if it exists
        if (this.hasEmptyMessageTarget) {
          this.emptyMessageTarget.remove();
        }
      } else {
        alert("Failed to create note!");
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert("An error occurred while saving the note!");
    });
  }

  editNote(noteId, content) {
    // Get note element
    const noteElement = document.getElementById(`note-${noteId}`);
    const noteBody = noteElement.querySelector('.card-body');

    // Set current editing note
    currentEditingNoteId = noteId;

    // Replace note content with edit form
    noteBody.innerHTML = `
      <textarea class="form-control" id="edit-note-${noteId}" rows="3">${content}</textarea>
      <div class="mt-2">
        <button onclick="window.expandableNotesController.saveEdit()" class="btn btn-sm btn-success">Save</button>
        <button onclick="window.expandableNotesController.cancelEdit(${noteId}, '${content.replace(/'/g, "\\'")}')" class="btn btn-sm btn-secondary">Cancel</button>
      </div>
    `;
  }

  saveEdit() {
    if (!currentEditingNoteId) return;

    const content = document.getElementById(`edit-note-${currentEditingNoteId}`).value;

    if (!content.trim()) {
      alert("Note cannot be empty!");
      return;
    }

    fetch(`/customers/${this.customerIdValue}/notes/${currentEditingNoteId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': this.getCSRFToken()
      },
      body: JSON.stringify({
        note: {
          content: content
        }
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data.success) {
        const noteElement = document.getElementById(`note-${currentEditingNoteId}`);
        const noteBody = noteElement.querySelector('.card-body');

        noteBody.innerHTML = data.note.content;
        currentEditingNoteId = null;
      } else {
        alert("Failed to update note!");
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert("An error occurred while updating the note!");
    });
  }

  cancelEdit(noteId, content) {
    const noteElement = document.getElementById(`note-${noteId}`);
    const noteBody = noteElement.querySelector('.card-body');

    // Restore original content
    noteBody.innerHTML = content;
    currentEditingNoteId = null;
  }

  deleteNote(noteId) {
    fetch(`/customers/${this.customerIdValue}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'X-CSRF-Token': this.getCSRFToken()
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data.success) {
        // Remove note from DOM
        const noteElement = document.getElementById(`note-${noteId}`);
        noteElement.remove();

        // Check if there are any notes left
        if (this.notesListTarget.querySelectorAll('.note-item').length === 0) {
          // Add "No notes yet" message
          const emptyMessage = document.createElement('p');
          emptyMessage.className = 'text-muted';
          emptyMessage.textContent = 'No notes yet.';
          emptyMessage.dataset.expandableNotesTarget = 'emptyMessage';
          this.notesListTarget.appendChild(emptyMessage);
        }
      } else {
        alert("Failed to delete note!");
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert("An error occurred while deleting the note!");
    });
  }

  // Helper to append new note to the list
  appendNoteToList(note) {
    const noteHtml = `
      <div class="card mb-3 note-item" id="note-${note.id}">
        <div class="card-body">
          ${note.content}
        </div>
        <div class="card-footer bg-transparent d-flex justify-content-between align-items-center">
          <small class="text-muted">
            By ${note.user_email} on ${new Date(note.created_at).toLocaleString()}
          </small>
          <div>
            <button onclick="window.expandableNotesController.editNote('${note.id}', '${note.content.replace(/'/g, "\\'")}')" class="btn btn-sm btn-warning">Edit</button>
            <button onclick="window.expandableNotesController.deleteNote('${note.id}')" class="btn btn-sm btn-danger">Delete</button>
          </div>
        </div>
      </div>
    `;

    // Insert at the beginning of the list
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = noteHtml;
    this.notesListTarget.prepend(tempDiv.firstElementChild);
  }

  // Helper to get CSRF token
  getCSRFToken() {
    return document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  }
}
