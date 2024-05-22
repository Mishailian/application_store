import { useNavigate } from "react-router-dom";
import { staticApi } from "../../static/static";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../app/auth/authSlice";
import { Login } from "../../app/auth/Login";

export const Root = () => {
  var result;
  var s = staticApi();
  const token = useSelector((state) => state.auth.token);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const username = useSelector((state) => state.auth.username);
  const username_id = useSelector((state) => state.auth.username_id);
  const is_superuser = useSelector((state) => state.auth.is_superuser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  var isTokenValid = JSON.parse(localStorage.getItem("persist:root"));
  isTokenValid = JSON.parse(isTokenValid.auth)?.token;
  useEffect(() => {
    if (!isTokenValid) {
      dispatch(
        setToken({ token, is_superuser, username, username_id, isAuth: true })
      );
    }
  }, [isTokenValid]);

  if (isAuth) {
    var list_of_routers = () => {
      var result = [];
      var objscts = Object.keys(s.paths);
      var route;
      for (var key in objscts) {
        route = objscts[key];
        var handleleClick = ((r) => () => {
          navigate(r);
        })(s.paths[route]);

        result.push(
          <li>
            <button onClick={handleleClick}>{s.names[route]}</button>
          </li>
        );
      }
      return result;
    };

    result = (
      <>
        <div
          id="sidebar"
          className="row-span-12 col-start-1 col-end-2 bg-sideBar"
        >
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
            <ul>{...list_of_routers()}</ul>
          </nav>
          <h1 onClick={() => navigate(s.paths.auth)}>{username}</h1>
        </div>
        <div className="row-span-1 col-start-2 col-end-7 bg-white">header</div>
        <div className="row-span-11 col-start-2 col-end-7 bg-mainBG">
          <Outlet />
        </div>
      </>
    );
  } else {
    result = <Login />;
  }
  return result;
};
