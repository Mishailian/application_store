import { useNavigate } from "react-router-dom";
import { staticApi } from "../../static/static";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../app/auth/authSlice";
import { Login } from "../../app/auth/Login";

export const Root = () => {
  var s = staticApi();
  // надо оптемезировать внизу а то диспачим постоянно при любом ножатии
  const token = useSelector((state) => state.auth.token);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const username = useSelector((state) => state.auth.username);
  const username_id = useSelector((state) => state.auth.username_id);
  const is_superuser = useSelector((state) => state.auth.is_superuser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  var isTokenValid = JSON.parse(localStorage.getItem("persist:root"));
  isTokenValid = JSON.parse(isTokenValid.auth).token;
  useEffect(() => {
    if (!isTokenValid) {
      dispatch(
        setToken({ token, is_superuser, username, username_id, isAuth: true })
      );
    }
  }, [isTokenValid]);

  if (isAuth) {
    return (
      <>
        <div id="sidebar">
          <div>
            <form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
              />
              <div id="search-spinner" aria-hidden hidden={true} />
              <div className="sr-only" aria-live="polite"></div>
            </form>
            <form method="post">
              <button type="submit">New</button>
            </form>
          </div>
          <nav>
            <ul>
              <li>
                <button
                  onClick={() => {
                    navigate(s.paths.undeclaredPosts);
                  }}
                >
                  {s.names.undeclaredPosts}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate(s.paths.arhive);
                  }}
                >
                  {s.names.arhive}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate(s.paths.posts);
                  }}
                >
                  {s.names.posts}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate(s.paths.users);
                  }}
                >
                  {s.names.users}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate(s.paths.addPost);
                  }}
                >
                  {s.names.addPost}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate(s.paths.tagList);
                  }}
                >
                  {s.names.tagList}
                </button>
              </li>
            </ul>
          </nav>
          <h1 onClick={() => navigate(s.paths.auth)}>{username}</h1>
        </div>
        <div id="detail">
          <Outlet />
        </div>
      </>
    );
  } else {
    return <Login />;
  }
};
