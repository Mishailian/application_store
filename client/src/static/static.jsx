import { useDispatch, useSelector } from "react-redux";
import { _postBlockButtons } from "../auxСomponents/_postBlockButtons";
import { _chooseBlock } from "../auxСomponents/_chooseBlock";
import { _chooseExecutor } from "../auxСomponents/_chooseExecutor";
import { _undeclaretedPostsBlock } from "../auxСomponents/_undeclaretedPostsBlock";
import { _tasksInputFields } from "../auxСomponents/_tasksInputFields";
import { _postBlock } from "../auxСomponents/_postBlock";
import { setUsersTable } from "../app/auth/usesSlice";

export var staticApi = () => {
  var username = useSelector((state) => state.auth.username);
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
        name: "test",
        about: null,
        data_dead_line: null,
        author: username,
      },
      addPosition: {
        title: "",
        units: null,
        quantity: 0,
        deadline: new Date(),
        isDone: false,
      },
      postBlockButtons: (id, dellete, navigate) =>
        _postBlockButtons(id, dellete, navigate, is_superuser),

      chooseExecutor: (chengeState, executor, result) =>
        _chooseExecutor(chengeState, executor, result),

      undeclaretedPostsBlock: (callBack) => _undeclaretedPostsBlock(callBack),

      chooseBlock: (obj, callback) => _chooseBlock(obj, callback),

      postBlock: (data) => _postBlock(data),

      tasksInputFields: _tasksInputFields,
    },
  };
  return obj;
};
// надо провести сюда запрос по получению пользователь и включить хэш  это сейчас находиться в Login.js
export var useUpdateUsersTable = () => {
  var callBack;
  var dispatch = useDispatch();
  var usersTable = useSelector((state) => state.users);
  // console.log(usersTable);
  usersTable = Object.values(usersTable);
  callBack = (users = null) => {
    if (usersTable[0]) {
      var table = {};
      Object.values(usersTable[0]).map((user) => {
        table[user.id] = user.name;
      });
      dispatch(setUsersTable(table));
    } else {
      // нужно предложить их создать
      // throw new Error("0 users!");
    }
  };
  return callBack;
};
