import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthenticationMutation } from "../api/apiSlice";
import { setToken } from "./authSlice";
import { setUsers } from "./usesSlice";
import { useGetUsersDBQuery } from "../api/apiSlice";
import { useProgressCheck } from "../../hooks/useProgressCheck";

export const Login = (props) => {
  const authToken = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const setUsersDataBase = (data) => dispatch(setUsers(data));
  const obj = useGetUsersDBQuery();
  const [auth, { data, error, isLoading }] = useAuthenticationMutation();

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

        const users = useProgressCheck(obj, { callBack: setUsersDataBase });
        console.log(users);
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
