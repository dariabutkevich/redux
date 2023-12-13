import { fetchNotes, fetchDelete } from "../../ApiFile";

export const getNotes = (authorId) => async (dispatch) => {
  try {
    dispatch({ type: "NOTES/LOADING" });

    const params = new URLSearchParams({ authorId }).toString();
    const notes = await fetch(`http://localhost:5001/notes?${params}`).then(
      (r) => r.json()
    );
    dispatch(setNotes(notes.reverse()));
    dispatch({ type: "NOTES/SET", payload: notes });
  } catch (err) {
    dispatch({ type: "NOTES/ERROR", payload: err.toString() });
  }
};

export const setNotes = (notes) => ({
  type: "NOTES/SET",
  payload: notes,
});

export const deleteNote = (noteId, authorId) => async (dispatch) => {
  try {
    dispatch({ type: "NOTES/LOADING" });
    await fetchDelete(noteId, authorId);
    const updatedNotes = await fetchNotes(authorId);
    dispatch(setNotes(updatedNotes.reverse()));
  } catch (error) {
    dispatch({ type: "NOTES/ERROR", payload: error.toString() });
  }
};
