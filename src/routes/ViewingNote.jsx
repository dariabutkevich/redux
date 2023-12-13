import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import LayoutHeader from "./LayoutHeader";
import { fetchNote, fetchDelete } from "../ApiFile";

function ViewingNote() {
  const [note, setNote] = useState(null);
  const { noteId } = useParams();

  useEffect(() => {
    fetchNote(noteId)
      .then((data) => {
        setNote(data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, [noteId]);

  function handleDeleteNote() {
    fetchDelete(noteId)
      .then(() => {
        setNote(null);
        window.location.href = "/notes";
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }
  if (!note) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <div>
        <LayoutHeader />
      </div>
      <div className="prose gap-5">
        <div className="flex justify-center  mt-8 items-center gap-6 ">
          {" "}
          <Link to="/notes" className="py-2 px-4 mb-5">
            Back
          </Link>
          <h1>{note.title}</h1>
          <Link
            to={`/editnote/${note.id}`}
            className="text-black py-2 px-4 mb-5"
          >
            <span role="img" aria-label="Edit">
              ✍️
            </span>
          </Link>
          <div
            className="py-2 mb-5"
            role="img"
            aria-label="Delete"
            onClick={() => handleDeleteNote(note.id)}
            style={{ cursor: "pointer" }}
          >
            🗑
          </div>
        </div>
        <pre className="flex justify-centerbreak-all items-center gap-6 bg-white text-black">
          {note.text}
        </pre>
        <p className="flex justify-center  items-center gap-6 ">
          {new Date(note.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

export default ViewingNote;
