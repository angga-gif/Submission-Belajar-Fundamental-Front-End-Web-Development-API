const BASE_URL = 'https://notes-api.dicoding.dev/v2';

export async function fetchNotes() {
  const response = await fetch(`${BASE_URL}/notes`);
  const data = await response.json();
  if (data.status === 'success') {
    return data.data;
  } else {
    throw new Error(data.message);
  }
}

export async function createNote(title, body) {
  const response = await fetch(`${BASE_URL}/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, body }),
  });
  return response;
}

export async function deleteNote(noteId) {
  const response = await fetch(`${BASE_URL}/notes/${noteId}`, {
    method: 'DELETE',
  });
  return response;
}

export async function archiveNote(noteId) {
  const response = await fetch(`${BASE_URL}/notes/${noteId}/archive`, {
    method: 'POST',
  });
  return response;
}

export async function unarchiveNote(noteId) {
  const response = await fetch(`${BASE_URL}/notes/${noteId}/unarchive`, {
    method: 'POST',
  });
  return response;
}