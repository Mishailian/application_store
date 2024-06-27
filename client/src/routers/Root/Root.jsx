import { useLocation, useNavigate } from "react-router-dom";
import { staticApi } from "../../static/static";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../app/auth/authSlice";
import { Login } from "../../app/auth/Login";

export const Root = () => {
  var result;
  var newLocation;
  const location = useLocation().pathname.replace(/\//g, "");

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
  const usersTable = useSelector((state) => state.users.usersTable);

  if (location.includes("users")) {
    newLocation = usersTable[location.split("users")[1]] ?? "users";
  } else {
    newLocation = s.names[location];
  }
  console.log(location);

  const header = () => {
    return (
      <>
        <div className="relative basis-11/12 flex justify-center items-center">
          <div>{newLocation}</div>
        </div>
        <div className="logo relative w-14 h-14 rounded-full bg-colarC overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-500">
          <div className="head absolute top-1 rounded-full h-6 w-6 bg-mainBG left-4"></div>
          <div className="body absolute h-6 w-14 rounded-full bottom-0 bg-mainBG"></div>
        </div>
      </>
    );
  };
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
          <div className="cursor-pointer" onClick={handleleClick}>
            <div className="relative inline-block bg-white w-3 h-3 mr-2"></div>
            {s.names[route]}
          </div>
        );
      }
      return result;
    };

    result = (
      <>
        <div
          id="sidebar"
          className="row-span-12 col-start-1 col-end-2 bg-sideBar text-white flex items-center justify-between flex-col text-base"
        >
          <div className="flex flex-col items-center justify-center">
            <div className="h-40 w-40 relative ">
              <div className="w-36 h-20 bg-red-400"></div>
              <div className="absolute bottom-5">УралШина</div>
            </div>
            <div className="flex flex-col gap-2">{...list_of_routers()}</div>
          </div>
          <div
            className="cursor-pointer inline-block "
            onClick={() => navigate(s.paths.auth)}
          >
            {username}
          </div>
        </div>
        <div className="row-span-1 col-start-2 col-end-7 bg-white flex items-center ">
          {header()}
        </div>
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
