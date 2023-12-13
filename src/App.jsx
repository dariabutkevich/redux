import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import LayoutFooter from "./routes/LayoutFooter";
import SignUp from "./routes/SignUp";
import Login from "./routes/Login";
import About from "./routes/About";
import Notes from "./routes/Notes";
import NewNote from "./routes/NewNote";
import EditNote from "./routes/EditNote";
import ViewingNote from "./routes/ViewingNote";
import Page404 from "./routes/Page404";
import { Provider } from "react-redux";
import store, { persistor } from "./redux";
import { PersistGate } from "redux-persist/integration/react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutFooter />,
    children: [
      { path: "/", element: <SignUp /> },
      { path: "/login", element: <Login /> },
      {
        path: "/about",
        element: (
          <RequireAuth>
            <About />
          </RequireAuth>
        ),
      },
      {
        path: "/notes",
        element: (
          <RequireAuth>
            <Notes />
          </RequireAuth>
        ),
      },
      {
        path: "/newnote",
        element: (
          <RequireAuth>
            <NewNote />
          </RequireAuth>
        ),
      },
      {
        path: "/editnote/:noteId",
        element: (
          <RequireAuth>
            <EditNote />
          </RequireAuth>
        ),
      },
      {
        path: "/viewingnote/:noteId",
        element: (
          <RequireAuth>
            <ViewingNote />
          </RequireAuth>
        ),
      },
      { path: "*", element: <Page404 /> },
    ],
  },
]);
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}
