import { useSelector } from "react-redux";

export var staticApi = () => {
  var username_id = useSelector((state) => state.auth.username_id);

  return {
    paths: {
      users: "/users/",
      posts: "/store/",
      auth: "/auth/",
      addPost: "/addPost/",
      addUser: "/addUser/",
      tagList: "/tagList/",
    },
    names: {
      posts: "posts",
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
        price_id: "",
        data_dead_line: null,
        executor: null,
        author: username_id,
        tags: [],
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
