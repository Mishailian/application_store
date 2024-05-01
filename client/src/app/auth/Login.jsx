import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthenticationMutation } from "../api/apiSlice";
import { setToken } from "./authSlice";
import { setTagsTable } from "./tagsSlice";
import { setUsersTable } from "./usesSlice";
import { useGetTagsQuery } from "../api/apiSlice";
import { useGetUsersDBQuery } from "../api/apiSlice";
import { progressCheck } from "../../progressCheck";
import { updateObjectsTable } from "../../static/static";

export const Login = () => {
  const authToken = useSelector((state) => state.auth.token);
  var updateUsersTable = updateObjectsTable(setUsersTable);
  var updateTagsTable = updateObjectsTable(setTagsTable);
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const tags = useGetTagsQuery();
  const users = useGetUsersDBQuery();
  const [auth] = useAuthenticationMutation();

  const handleLogin = async () => {
    try {
      const { data, error } = await auth({ initialState: credentials });
      if (data) {
        const is_superuser = data.is_superuser;
        const username = data.username;
        const username_id = data.username_id;
        const token = data.token;
        dispatch(
          setToken({
            isAuth: true,
            username: username,
            username_id: username_id,
            is_superuser: is_superuser,
            token: token,
          })
        );
        progressCheck(tags, updateTagsTable);
        progressCheck(users, updateUsersTable);
      } else {
        console.error(error);
      }
      setCredentials({ username: "", password: "" });
    } catch (error) {
      console.error(error);
    }
  };

  const logOut = () => {
    dispatch(
      setToken({
        token: null,
        isAuth: false,
        is_superuser: null,
        username: null,
      })
    );
  };

  return (
    <>
      {authToken ? (
        <button onClick={logOut}>log out</button>
      ) : (
        <>
          <input
            type="text"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
          />
          <input
            type="password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
          <button onClick={handleLogin}>Login</button>
        </>
      )}
    </>
  );
};
