import ReactDOM from "react-dom/client";
import "./index.css";
import store, { persistor } from "./app/store";
import { Provider } from "react-redux";
import { Root } from "./routers/Root/Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PostsList } from "./routers/PostsList/PostsList";
import { Login } from "./app/auth/Login";
import { PersistGate } from "redux-persist/integration/react";
import { UserList } from "./routers/UserList/UserList";
import { SinglePost } from "./routers/Post/SinglePost";
import { AddPost } from "./routers/Post/AddPost";
import { AddUser } from "./routers/User/AddUser";
import { UserPage } from "./routers/User/UserPage";
import { TagList } from "./routers/Tags/TagList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/store",
        element: <PostsList />,
      },
      {
        path: "/store/:postId",
        element: <SinglePost />,
      },
      {
        path: "/users",
        element: <UserList />,
      },
      {
        path: "/users/:userId",
        element: <UserPage />,
      },
      {
        path: "/auth",
        element: <Login />,
      },
      {
        path: "/addPost",
        element: <AddPost />,
      },
      {
        path: "/addUser",
        element: <AddUser />,
      },
      {
        path: "/tagList",
        element: <TagList />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);
