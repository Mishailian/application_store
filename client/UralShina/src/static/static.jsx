import { useSelector } from "react-redux";

export var staticApi = () => {
  var username_id = useSelector((state) => state.auth.username_id);
  var is_superuser = useSelector((state) => state.auth.is_superuser);

  var obj = {
    paths: {
      users: "/users/",
      posts: "/store/",
      undeclaredPosts: "/undeclared/",
      arhive: "/archived/",
      auth: "/auth/",
      addPost: "/addPost/",
      addUser: "/addUser/",
      tagList: "/tagList/",
    },
    names: {
      posts: "posts",
      arhive: "arhive",
      undeclaredPosts: "udeclared",
      users: "users",
      auth: "authorisation",
      addPost: "addPost",
      addUser: "addUser",
      tagList: "tagList",
    },
    structure: {
      addPost: {
        name: "asd",
        about: null,
        data_dead_line: null,
        author: username_id,
      },
      addPosition: {
        title: "",
        units: "см",
        quantity: 0,
        deadline: new Date(),
      },
      postBlockButtons: function (id, dellete, navigate) {
        return (
          <>
            <button onClick={() => navigate(`${obj.names.posts}${id}`)}>
              перейти
            </button>
            {is_superuser ? <button onClick={dellete}>удалить</button> : null}
          </>
        );
      },
      chooseExecutor: function (chengeState, executor, result) {
        return (
          <div className="ml-2">
            <div className="text-info">
              {<div onClick={chengeState}>{executor ?? "❌"}</div>}
            </div>
            {result}
          </div>
        );
      },
      undeclaretedPostsBlock: function (callBack) {
        return (
          <>
            <button onClick={() => callBack()}>задекларировать</button>
          </>
        );
      },
    },
  };
  return obj;
};

export var getUsersTable = () => {
  var usersTable = useSelector((state) => state.users);
  usersTable = Object.values(usersTable);
  var table = {};
  Object.values(usersTable[0]).map((user) => {
    table[user.id] = user.name;
  });
  return table;
};
