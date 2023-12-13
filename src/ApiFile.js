const url = "http://localhost:5001";

export const fetchLogin = async (email, password, userId) => {
  const query = new URLSearchParams({
    email,
    password,
    userId,
  }).toString();
  const response = await fetch(`${url}/users?${query}`);
  const users = await response.json();
  return users[0];
};

export const fetchNote = async (noteId) => {
  try {
    const response = await fetch(`${url}/notes/${noteId}`);
    return await response.json();
  } catch (error) {
    console.log("Error", error);
  }
};

export const fetchSaveNote = async (noteData) => {
  try {
    const response = await fetch(`${url}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noteData),
    });
    if (!response.ok) {
      throw new Error("Error");
    }
    return await response.json();
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

export const fetchDelete = async (noteId, authorId) => {
  try {
    const response = await fetch(
      `${url}/notes/${noteId}?authorId=${authorId}`,
      {
        method: "DELETE",
      }
    );
    return await response.json();
  } catch (error) {
    console.log("Error", error);
  }
};

export const fetchNotes = async (authorId) => {
  try {
    const response = await fetch(`${url}/notes?authorId=${authorId}`);
    return await response.json();
  } catch (error) {
    console.log("Error", error);
  }
};
