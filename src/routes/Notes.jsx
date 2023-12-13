import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import LayoutHeader from "./LayoutHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  selectNotes,
  selectNotesError,
  selectNotesLoading,
} from "../redux/notes/selector";
import { getNotes, deleteNote } from "../redux/notes/actions";
import { selectUserId } from "../redux/user/selectors";

function Notes() {
  const authorId = useSelector(selectUserId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotes(authorId));
  }, [dispatch]);

  function handleDeleteNote(noteId) {
    dispatch(deleteNote(noteId, authorId));
  }

  const notes = useSelector(selectNotes);
  const loading = useSelector(selectNotesLoading);
  const error = useSelector(selectNotesError);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <div>
        <LayoutHeader />
      </div>
      <div className=" prose gap-5">
        <h1 className="flex justify-center mt-8">Notes</h1>
        <div className="flex justify-center">
          <Link to="/newnote">
            <button className="py-2 px-4 mb-8  bg-gray-300  hover:bg-gray-400 text-black">
              Add new note
            </button>
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          {notes?.map((note) => (
            <div
              className="flex gap-6  items-center bg-gray-300  hover:bg-gray-400 h-10 pr-5"
              key={note.id}
            >
              <Link to={`/viewingnote/${note.id}`} className="flex-1 px-6 ">
                <p className="font-bold">{note.title}</p>
              </Link>
              <div>{new Date(note.createdAt).toLocaleDateString()}</div>
              <div>
                <Link to={`/editnote/${note.id}`} className="text-black">
                  <span role="img" aria-label="Edit">
                    ✍️
                  </span>
                </Link>
              </div>
              <div
                role="img"
                aria-label="Delete"
                onClick={() => handleDeleteNote(note.id)}
                style={{ cursor: "pointer" }}
                className="text-red-600"
              >
                🗑
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notes;
