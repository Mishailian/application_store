import { useSelector } from "react-redux";

export var staticApi = () => {
  var username_id = useSelector((state) => state.auth.username_id);

  return {
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
    },
  };
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
