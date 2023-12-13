import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import LayoutHeader from "./LayoutHeader";
import { z } from "zod";
import { fetchSaveNote } from "../ApiFile";
import { useSelector } from "react-redux";
import { selectUserId } from "../redux/user/selectors";

function NewNote() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const authorId = useSelector(selectUserId);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("newNote", JSON.stringify({ title, text }));
  }, [title, text]);

  const Note = z.object({
    title: z.string().min(1),
  });

  function handleSaveNote() {
    const validation = Note.safeParse({ title });

    if (!validation.success) {
      setError("The Title field cannot be empty.");
      return;
    }

    const newNote = {
      title: title,
      text: text,
      createdAt: Date.now(),
      authorId: authorId,
    };

    fetchSaveNote(newNote)
      .then(() => {
        navigate("/notes");
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }

  return (
    <div className="flex flex-col items-center">
      <div>
        <LayoutHeader />
      </div>
      <div className="prose flex flex-col gap-5 ">
        <div className="flex justify-center  mt-8 items-center gap-6 ">
          {" "}
          <Link to="/notes" className="py-2 px-4 mb-5">
            Back
          </Link>
          <h1>New Note</h1>
        </div>
        <input
          className=" py-2 px-4 bg-gray-100 "
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />{" "}
        {error && <p className="error">{error}</p>}
        <textarea
          className=" py-2 px-4 bg-gray-100 "
          placeholder="Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <div className="flex justify-center">
          <button
            className=" py-2 px-4 mb-8 w-20  bg-gray-300  hover:bg-gray-400 text-black"
            onClick={handleSaveNote}
          >
            Save
          </button>
        </div>{" "}
      </div>
    </div>
  );
}

export default NewNote;
